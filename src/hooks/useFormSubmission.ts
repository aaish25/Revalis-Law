import { useState, useCallback } from 'react';

interface UseFormSubmissionOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

interface UseFormSubmissionReturn<T> {
  submit: (data: T) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

/**
 * Custom hook for handling form submissions with loading and error states
 */
export function useFormSubmission<T>(
  submitFn: (data: T) => Promise<{ success: boolean; error?: string }>,
  options: UseFormSubmissionOptions = {}
): UseFormSubmissionReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (data: T): Promise<boolean> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await submitFn(data);

        if (result.success) {
          setSuccess(true);
          options.onSuccess?.(result);
          return true;
        } else {
          const errorMessage = result.error || 'Submission failed';
          setError(errorMessage);
          options.onError?.(errorMessage);
          return false;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        options.onError?.(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [submitFn, options]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { submit, loading, error, success, reset };
}

/**
 * Simple hook for tracking form submission state
 */
export function useSubmitState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const startSubmit = useCallback(() => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  }, []);

  const submitSuccess = useCallback(() => {
    setLoading(false);
    setSuccess(true);
  }, []);

  const submitError = useCallback((errorMessage: string) => {
    setLoading(false);
    setError(errorMessage);
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    loading,
    error,
    success,
    startSubmit,
    submitSuccess,
    submitError,
    reset,
  };
}

