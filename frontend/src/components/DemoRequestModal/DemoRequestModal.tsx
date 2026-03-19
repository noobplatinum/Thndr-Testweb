import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { useDemoRequest } from '../../hooks/useDemoRequest';
import type { DemoRequestPayload } from '../../types';
import './DemoRequestModal.css';

interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const initialForm: DemoRequestPayload = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<DemoRequestPayload>(initialForm);
  const { submit, loading, success, error, reset } = useDemoRequest();

  useEffect(() => {
    if (!open) {
      setFormData(initialForm);
      reset();
    }
  }, [open, reset]);

  if (!open) {
    return null;
  }

  const handleClose = () => {
    if (loading) {
      return;
    }
    setFormData(initialForm);
    reset();
    onClose();
  };

  const onFieldChange =
    (field: keyof DemoRequestPayload) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit(formData);
  };

  return (
    <div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
      <div className="demo-modal__overlay" onClick={handleClose} />
      <div className="demo-modal__panel">
        <button
          type="button"
          className="demo-modal__close"
          onClick={handleClose}
          aria-label="Close demo request modal"
        >
          ×
        </button>

        <h2 id="demo-modal-title" className="demo-modal__title">
          Book a Demo
        </h2>
        <p className="demo-modal__subtitle">Send your details and our team will contact you.</p>

        {success ? (
          <div className="demo-modal__success">
            <h3>Request sent successfully</h3>
            <p>Thank you for your interest. We will reach out shortly.</p>
            <Button variant="primary" onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form className="demo-modal__form" onSubmit={onSubmit}>
            <label className="demo-modal__label">
              Name
              <input
                className="demo-modal__input"
                value={formData.name}
                onChange={onFieldChange('name')}
                type="text"
              />
            </label>

            <label className="demo-modal__label">
              Email
              <input
                className="demo-modal__input"
                value={formData.email}
                onChange={onFieldChange('email')}
                type="email"
                required
              />
            </label>

            <label className="demo-modal__label">
              Company
              <input
                className="demo-modal__input"
                value={formData.company}
                onChange={onFieldChange('company')}
                type="text"
              />
            </label>

            <label className="demo-modal__label">
              Message
              <textarea
                className="demo-modal__input demo-modal__textarea"
                value={formData.message || ''}
                onChange={onFieldChange('message')}
                rows={3}
              />
            </label>

            {error ? <p className="demo-modal__error">{error}</p> : null}

            <Button type="submit" variant="primary" size="md" disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
