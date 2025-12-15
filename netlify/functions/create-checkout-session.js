import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, amount, successUrl, cancelUrl, serviceId, serviceName } = JSON.parse(event.body);

    // Validate inputs
    if (!email || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Determine product details based on serviceId
    let productName = serviceName || 'Legal Consultation';
    let productDescription = 'Initial consultation and case review with access to all intake forms';
    
    if (serviceId === 'emergency-consultation') {
      productName = 'Emergency Legal Consultation';
      productDescription = 'Urgent legal consultation with response within 2 hours';
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: amount, // Amount already in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl || `${event.headers.origin}/payment-success`}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${event.headers.origin}/dashboard?tab=emergency`,
      customer_email: email,
      metadata: {
        email,
        payment_type: serviceId === 'emergency-consultation' ? 'emergency' : 'consultation',
        service_id: serviceId || 'consultation',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create checkout session',
      }),
    };
  }
};
