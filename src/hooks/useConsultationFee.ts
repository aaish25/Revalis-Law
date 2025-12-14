import { useContext } from 'react';
import { ConsultationFeeContext } from '../contexts/ConsultationFeeContext';

export function useConsultationFee() {
  const context = useContext(ConsultationFeeContext);
  if (context === undefined) {
    throw new Error('useConsultationFee must be used within ConsultationFeeProvider');
  }
  return context;
}
