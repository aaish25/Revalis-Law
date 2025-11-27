# Quick Reference Guide - React Components

## 🔧 Common Component Recipes

### 1. Create a Service Page

**File**: `src/pages/Services/YourService.tsx`

```tsx
import React from 'react';
import { MainLayout, Hero, ServiceGrid, ProcessFlow, CTASection } from '@/components';

export const YourService: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero
        title={
          <>
            Main Title
            <br />
            <span className="text-accent">Highlighted Text</span>
          </>
        }
        subtitle="Brief description of your service offering"
        price="$1,500 - $5,000"
        priceNote="Service pricing range"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/#services' },
          { label: 'Your Service' },
        ]}
        ctaButtons={[
          { text: 'Get Started', icon: '📞', href: '#contact', variant: 'primary' },
          { text: 'Learn More', icon: '📋', href: '#details', variant: 'secondary' },
        ]}
      />

      {/* Services Grid */}
      <ServiceGrid
        title="What We Provide"
        subtitle="Detailed breakdown of services"
        services={[
          {
            icon: '💼',
            title: 'Service 1',
            description: 'Description of what you offer',
            price: '$1,000 - $2,000',
          },
          {
            icon: '📊',
            title: 'Service 2',
            description: 'Another service offering',
            price: '$2,000 - $3,000',
          },
        ]}
      />

      {/* Process Section */}
      <ProcessFlow
        title="Our Process"
        subtitle="How we help you achieve your goals"
        steps={[
          {
            number: 1,
            title: 'Initial Consultation',
            description: 'We understand your needs and requirements',
          },
          {
            number: 2,
            title: 'Analysis & Planning',
            description: 'We develop a tailored strategy',
          },
          {
            number: 3,
            title: 'Implementation',
            description: 'We execute and deliver results',
          },
          {
            number: 4,
            title: 'Support & Follow-up',
            description: 'We ensure your success',
          },
        ]}
        backgroundColor="gray"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact our team to discuss your needs"
        buttons={[
          { text: 'Schedule Consultation', icon: '📞', href: '#', variant: 'primary' },
          { text: 'Email Us', icon: '✉️', href: 'mailto:contact@rivalislaw.com', variant: 'secondary' },
        ]}
      />
    </MainLayout>
  );
};

export default YourService;
```

**Then update router**:
```tsx
// In router.tsx, add to Routes:
<Route
  path="/services/your-service"
  element={
    <React.Suspense fallback={<div>Loading...</div>}>
      <YourService />
    </React.Suspense>
  }
/>
```

---

### 2. Create a Form Page

**File**: `src/pages/Forms/YourForm.tsx`

```tsx
import React from 'react';
import { MainLayout, Hero, ClientIntakeForm, CTASection } from '@/components';

export const YourFormPage: React.FC = () => {
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // TODO: Send to backend API
  };

  return (
    <MainLayout>
      <Hero
        title={
          <>
            Get Legal Help
            <br />
            <span className="text-accent">Fill Out Our Form</span>
          </>
        }
        subtitle="Tell us about your situation and we'll get back to you within 24 hours"
      />

      <section className="section">
        <ClientIntakeForm
          serviceType="your-service"
          onSubmit={handleFormSubmit}
        />
      </section>

      <CTASection
        title="Questions?"
        subtitle="Our team is ready to help. Call us or send an email."
        buttons={[
          { text: 'Call Us', icon: '📞', href: 'tel:+1-202-555-0199', variant: 'primary' },
        ]}
      />
    </MainLayout>
  );
};

export default YourFormPage;
```

---

### 3. Add a Button

```tsx
import { Button } from '@/components';

// Primary button
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary button (white border)
<Button variant="secondary">
  Learn More
</Button>

// Outline button
<Button variant="outline" size="sm">
  View Details
</Button>

// Link button
<Button as="a" href="/services" variant="primary">
  Go to Services
</Button>

// Loading state
<Button loading={isSubmitting}>
  Submit
</Button>

// Disabled button
<Button disabled>
  Coming Soon
</Button>
```

---

### 4. Create a Card Grid

```tsx
import { Card } from '@/components';

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
  {services.map((service) => (
    <Card
      key={service.id}
      icon={service.icon}
      title={service.title}
      description={service.description}
      price={service.price}
    >
      {/* Optional children content */}
      <Button variant="outline" size="sm" className="mt-4">
        Learn More
      </Button>
    </Card>
  ))}
</div>
```

---

### 5. Create a Form Section

```tsx
import { FormField } from '@/components';
import { useState } from 'react';

export const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="max-w-2xl mx-auto">
      <FormField
        label="Your Name"
        name="name"
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <FormField
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@example.com"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <FormField
        label="Message"
        name="message"
        type="textarea"
        placeholder="Your message here..."
        required
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />

      <Button type="submit" variant="primary">
        Send Message
      </Button>
    </form>
  );
};
```

---

### 6. Add Icons (Emoji for now, or Font Awesome)

Available emoji icons used in templates:
```
📞 Phone
✉️ Email
📋 Document/Form
💼 Business
📊 Chart
🔒 Security
💡 Idea
🌍 Global
👥 People
📄 Document
🤝 Partnership
🛡️ Shield
🏢 Building
💰 Money
🏠 Home
∞ Infinity
⚠️ Warning
©️ Copyright
⚖️ Scales of Justice
$  Dollar
🚫 Prohibition
🔍 Search
⭐ Star
✅ Check
❌ X
```

To use Font Awesome (add later):
```tsx
<i className="fas fa-envelope"></i>
```

---

### 7. Add Breadcrumbs

```tsx
<Hero
  breadcrumb={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Contract Review', href: '/services/contracts' },
    { label: 'Review Process' }, // No href = current page
  ]}
  // ... other props
/>
```

---

### 8. Use CSS Classes

**Text Colors**:
```tsx
className="text-primary"      // Navy
className="text-accent"       // Gold
className="text-gray-600"     // Gray
className="text-white"        // White
```

**Backgrounds**:
```tsx
className="bg-white"
className="bg-gray-50"
className="bg-primary"
```

**Gradients** (use in style attr or custom):
```tsx
style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)' }}
```

**Spacing**:
```tsx
className="px-6 py-3"   // Padding
className="mb-8"        // Margin bottom
className="gap-4"       // Grid gap
className="py-24"       // Vertical padding (section)
```

**Typography**:
```tsx
className="font-serif font-bold text-5xl"    // Large heading
className="font-sans font-semibold text-lg"  // Regular text
className="text-sm text-gray-500"            // Small text
```

**Responsive**:
```tsx
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="text-2xl md:text-4xl"
className="hidden md:flex"
```

---

### 9. Navigation Links

```tsx
import { Navigation } from '@/components';

// Default navigation
<Navigation />

// Custom navigation
<Navigation
  links={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
  ]}
  ctaText="Book Now"
  ctaHref="/contact"
/>
```

---

### 10. Full Page Example

```tsx
import React from 'react';
import { MainLayout, Hero, Card, Button, CTASection } from '@/components';

export const Example: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <Hero
        title={<>Main Title<br/><span className="text-accent">Accent</span></>}
        subtitle="Description"
        ctaButtons={[
          { text: 'Button 1', icon: '📞', href: '#', variant: 'primary' },
        ]}
      />

      {/* Content Sections */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              icon="💼"
              title="Service 1"
              description="Details"
              price="$1,000"
            />
            <Card
              icon="📊"
              title="Service 2"
              description="Details"
              price="$2,000"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready?"
        subtitle="Let's get started"
        buttons={[
          { text: 'Get Started', icon: '📞', href: '#', variant: 'primary' },
        ]}
      />
    </MainLayout>
  );
};

export default Example;
```

---

## 🎨 Common Patterns

### Pattern 1: Service Page Layout
```
Hero → ServiceGrid → ProcessFlow → RedFlags → CTASection
```

### Pattern 2: Form Page Layout
```
Hero → FormComponent → CTASection
```

### Pattern 3: Legal Page Layout
```
Hero → Content (text) → CTASection
```

### Pattern 4: Section with Cards
```
SectionTitle → CardGrid → Button
```

---

## 🚀 Tips & Tricks

1. **Reuse Components**: Don't repeat HTML, use components
2. **Props-Driven**: Pass data as props, not hardcode
3. **Mobile First**: Test on mobile - all components are responsive
4. **Semantic HTML**: Use proper heading hierarchy
5. **Accessibility**: Add alt text to images, labels to forms
6. **Performance**: Use React.lazy() for page components
7. **Styling**: Use Tailwind classes, minimal custom CSS
8. **Types**: Always export TypeScript types for components
9. **Testing**: Test components in isolation
10. **Documentation**: Add JSDoc comments to complex components

---

## 🔗 File Imports Reference

```tsx
// Layout
import { MainLayout, Navigation, Footer } from '@/components';

// Common
import { Button, Hero, Card, ProcessFlow, CTASection } from '@/components';

// Forms
import { FormField, ClientIntakeForm } from '@/components';

// Services
import { ServiceGrid, RedFlags } from '@/components';

// Router
import { AppRouter } from '@/router';

// Types
import type { ButtonProps, CardProps } from '@/types';
```

---

**Pro Tip**: Copy the examples above and modify them for your specific use case. Most components are highly customizable through props!

