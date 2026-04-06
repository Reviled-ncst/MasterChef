"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { showToast } from '../lib/toast';
import { useLogin } from '../lib/authHooks';
import styles from './AuthModal.module.css';

const PRIMARY = '#D9642E';
const PRIMARY_HOVER = '#C65525';
const INPUT_BORDER = '#e6e6e6';
const LOGO_URL = 'https://res.cloudinary.com/djnzwvb2t/image/upload/v1774440374/Master_chef_logo_uhwzq3.png';

type AuthProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitch?: () => void;
};

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [exiting, setExiting] = useState(false);

  const startClose = () => {
    if (exiting) return;
    setExiting(true);
    // match CSS exit animation duration
    setTimeout(() => onClose(), 260);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') startClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, exiting]);

  useEffect(() => {
    // focus first focusable element inside the dialog
    setTimeout(() => {
      try {
        const el = dialogRef.current?.querySelector('input,button,select,textarea,a[href]') as HTMLElement | undefined;
        el?.focus();
      } catch (e) {}
    }, 40);
  }, []);

  return (
    <div ref={overlayRef} onClick={startClose} className={`${styles.modalOverlay} ${exiting ? styles.modalOverlayExit : ''}`}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="mc-modal-title" onClick={(e) => e.stopPropagation()} className={`${styles.dialog} ${exiting ? styles.dialogExit : ''}`}>
        <button aria-label="Close" onClick={startClose} className={styles.dialogClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export function LoginModal({ isOpen, onClose, onSwitch }: AuthProps) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const login = useLogin();

  // Forgot-password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const openForgotModal = () => setShowForgotModal(true);
  const closeForgotModal = () => setShowForgotModal(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotErrors, setForgotErrors] = useState<any>({});
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailRef.current?.focus(), 30);
    } else {
      setEmail(''); setPassword(''); setErrors({}); setShow(false); setRemember(false); setLoading(false); setShowForgotModal(false); setForgotEmail(''); setForgotErrors({}); setForgotLoading(false);
    }
  }, [isOpen]);

  const inputBase: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${INPUT_BORDER}`, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)', transition: 'box-shadow .12s, border-color .12s, transform .12s', background: '#fff' };
  const btnNeutral: React.CSSProperties = { padding: '10px 14px', borderRadius: 8, background: '#fff', border: `1px solid #ECECEC`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'transform .12s, box-shadow .12s' };
  const btnPrimary: React.CSSProperties = { padding: '10px 14px', borderRadius: 8, background: 'linear-gradient(180deg,#ff8a3d,#D9642E)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 14px rgba(217,100,46,0.18)', transition: 'transform .12s, box-shadow .12s' };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = `0 0 0 6px rgba(217,100,46,0.10)`;
    e.currentTarget.style.borderColor = PRIMARY;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = '';
    e.currentTarget.style.borderColor = INPUT_BORDER;
  };

  const handleSubmit = async (ev?: any) => {
    ev?.preventDefault();
    const e: any = {};
    if (!email) e.email = 'Email is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    const { user, error } = await login(email, password);
    setLoading(false);

    if (error) {
      setErrors({ submit: error });
      showToast({ title: error, status: 'error', duration: 3000 });
      return;
    }

    showToast({ title: `Welcome back, ${user?.name}!`, status: 'success', duration: 2000 });
    onClose();

    // Redirect to appropriate dashboard based on role
    if (user?.role === 'admin') {
      router.push('/admin-dashboard');
    } else {
      router.push('/gamer-dashboard');
    }
  };

  const handleForgotSubmit = async (ev?: any) => {
    ev?.preventDefault();
    const e: any = {};
    if (!forgotEmail) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) e.email = 'Invalid email address';
    setForgotErrors(e);
    if (Object.keys(e).length) return;
    setForgotLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setForgotLoading(false);
    showToast({ title: 'If an account exists, a reset link was sent (demo)', status: 'info', duration: 3000, isClosable: true });
    setForgotEmail('');
    closeForgotModal();
  };

  function ForgotModalContent() {
    if (!showForgotModal) return null;
    return (
      <ModalShell onClose={closeForgotModal}>
        <h3 id="mc-modal-title" style={{ margin: 0, marginBottom: 14, color: PRIMARY, fontSize: 20, fontWeight: 700 }}>Reset password</h3>
        <form onSubmit={handleForgotSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="mc-forgot-email" className={styles.fieldLabel}>Email</label>
            <input id="mc-forgot-email" className={styles.textInput} type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} style={inputBase} />
            {forgotErrors.email && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{forgotErrors.email}</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" onClick={closeForgotModal} style={btnNeutral}>Cancel</button>
            <button type="submit" disabled={forgotLoading} style={btnPrimary}>{forgotLoading ? 'Sending...' : 'Send reset link'}</button>
          </div>
        </form>
      </ModalShell>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      <ModalShell onClose={onClose}>
        <div className={styles.authGrid}>
          <div className={styles.leftPanel}>
            <img src={LOGO_URL} alt="Master Chef" className={styles.brandLogo} />
            <h4 className={styles.leftTag}>Welcome back!</h4>
            <p className={styles.leftSub}>Sign in to download, save progress, and join events.</p>
            <div className={styles.leftBullets}>
              <div>• Save progress & cloud sync</div>
              <div>• Access exclusive builds</div>
              <div>• Join community events</div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <h3 id="mc-modal-title" style={{ margin: 0, marginBottom: 14, color: PRIMARY, fontSize: 20, fontWeight: 700 }}>Sign in</h3>

            <div className={styles.socialRow}>
              <button type="button" className={styles.socialBtn} onClick={() => showToast({ title: 'Social sign-in not implemented', status: 'info' })}>
                <span className={`${styles.socialIcon} google`}>G</span>
                <span>Continue with Google</span>
              </button>
              <button type="button" className={styles.socialBtn} onClick={() => showToast({ title: 'Social sign-in not implemented', status: 'info' })}>
                <span className={`${styles.socialIcon} apple`}>A</span>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className={styles.divider}><span>or</span></div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14, padding: '10px 12px', background: 'rgba(13, 110, 253, 0.08)', borderRadius: 6, fontSize: 12, color: '#005fcc' }}>
                <strong>Demo Accounts:</strong><br/>
                Gamer: gamer@masterchef.com / player123<br/>
                Admin: admin@masterchef.com / admin123
              </div>

              <div style={{ marginBottom: 14 }}>
                <label htmlFor="mc-email" className={styles.fieldLabel}>Email</label>
                <input id="mc-email" ref={emailRef} className={styles.textInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={focusStyle} onBlur={blurStyle} style={inputBase} aria-required="true" />
                {errors.email && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label htmlFor="mc-password" style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Password</label>
                <div className={styles.inputWrapper}>
                  <input id="mc-password" className={styles.textInput} type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={focusStyle} onBlur={blurStyle} style={{ ...inputBase, paddingRight: 56 }} aria-required="true" />
                  <button type="button" aria-pressed={show} aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} className={`${styles.eyeButton} ${styles.eyeButtonInside}`}>
                    {show ? (
                      <svg className={`${styles.eyeIcon} ${styles.eyeIconActive}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 22 12s-4-7-10-7a9.77 9.77 0 0 0-7 2.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.password}</div>}
              </div>

              {errors.submit && <div style={{ color: 'crimson', marginBottom: 14, fontSize: 13, padding: '8px 12px', background: 'rgba(220, 53, 69, 0.08)', borderRadius: 6 }}>{errors.submit}</div>}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <span>Remember me</span>
                </label>
                <div style={{ fontSize: 14 }}>
                  <span style={{ marginRight: 8 }}>No account?</span>
                  <button type="button" onClick={() => { onClose(); onSwitch && onSwitch(); }} style={{ color: PRIMARY, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Create one</button>
                </div>
              </div>

              <div style={{ textAlign: 'right', marginBottom: 12 }}>
                <button type="button" onClick={openForgotModal} style={{ background: 'none', border: 'none', padding: 0, color: PRIMARY, cursor: 'pointer', fontSize: 13 }}>Forgot password?</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={onClose} style={btnNeutral}>Cancel</button>
                <button type="submit" disabled={loading} style={btnPrimary}>{loading ? 'Signing in...' : 'Sign in'}</button>
              </div>
            </form>
          </div>
        </div>
      </ModalShell>
      <ForgotModalContent />
    </>
  );
}

export function RegisterModal({ isOpen, onClose, onSwitch }: AuthProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 30);
    else {
      setName(''); setEmail(''); setPassword(''); setAgree(false); setShow(false); setErrors({}); setLoading(false);
    }
  }, [isOpen]);

  const validate = () => {
    const e: any = {};
    if (!name) e.name = 'Name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!agree) e.agree = 'You must accept terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: any) => {
    ev?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    showToast({ title: 'Account created (demo)', status: 'success', duration: 2000, isClosable: true });
    onClose();
  };

  // Terms modal hook/helpers: ensure hooks are declared before any early returns
  const [showTermsModal, setShowTermsModal] = useState(false);
  const openTermsModal = () => setShowTermsModal(true);
  const closeTermsModal = () => setShowTermsModal(false);

  if (!isOpen) return null;

  const inputBase: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${INPUT_BORDER}`, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)', transition: 'box-shadow .12s, border-color .12s, transform .12s', background: '#fff' };
  const btnNeutral: React.CSSProperties = { padding: '10px 14px', borderRadius: 8, background: '#fff', border: `1px solid #ECECEC`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'transform .12s, box-shadow .12s' };
  const btnPrimary: React.CSSProperties = { padding: '10px 14px', borderRadius: 8, background: 'linear-gradient(180deg,#ff8a3d,#D9642E)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 14px rgba(217,100,46,0.18)', transition: 'transform .12s, box-shadow .12s' };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = `0 0 0 6px rgba(217,100,46,0.10)`;
    e.currentTarget.style.borderColor = PRIMARY;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = '';
    e.currentTarget.style.borderColor = INPUT_BORDER;
  };

  function TermsModalContent() {
    if (!showTermsModal) return null;
    const effectiveDate = 'March 30, 2026';
    const modalBodyStyle: React.CSSProperties = { maxHeight: '56vh', overflowY: 'auto', marginBottom: 12, color: '#333' };
    const smallHeading: React.CSSProperties = { fontSize: 15, fontWeight: 700, marginBottom: 8 };
    return (
      <ModalShell onClose={closeTermsModal}>
        <h3 id="mc-modal-title" style={{ margin: 0, marginBottom: 12, color: PRIMARY, fontSize: 20, fontWeight: 700 }}>Terms &amp; Conditions</h3>
        <div style={modalBodyStyle}>
          <div style={{ marginBottom: 10 }}><strong>Effective date:</strong> {effectiveDate}</div>
          <div style={{ marginBottom: 8 }}>
            <div style={smallHeading}>Acceptance of Terms</div>
            <div>By using the Master Chef website you agree to these Terms. If you do not agree, do not use the service.</div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={smallHeading}>Your Account</div>
            <div>You are responsible for maintaining the confidentiality of your account credentials and activity.</div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={smallHeading}>License &amp; Use</div>
            <div>Master Chef grants a limited license for personal, non-commercial use of the Service.</div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={smallHeading}>Contact</div>
            <div>Questions? Email <a href="mailto:support@masterchef.example" style={{ color: PRIMARY }}>support@masterchef.example</a>.</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" onClick={closeTermsModal} style={btnNeutral}>Close</button>
        </div>
      </ModalShell>
    );
  }

  return (
    <>
      <ModalShell onClose={onClose}>
        <div className={styles.authGrid}>
          <div className={styles.leftPanel}>
            <img src={LOGO_URL} alt="Master Chef" className={styles.brandLogo} />
            <h4 className={styles.leftTag}>Join Master Chef</h4>
            <p className={styles.leftSub}>Create an account to save progress and access exclusive builds.</p>
            <div className={styles.leftBullets}>
              <div>• Cloud save & sync</div>
              <div>• Early access to builds</div>
              <div>• Community events & rewards</div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <h3 style={{ margin: 0, marginBottom: 14, color: PRIMARY, fontSize: 20, fontWeight: 700 }}>Create account</h3>

            <div className={styles.socialRow}>
              <button type="button" className={styles.socialBtn} onClick={() => showToast({ title: 'Social sign-up not implemented', status: 'info' })}>
                <span className={`${styles.socialIcon} google`}>G</span>
                <span>Continue with Google</span>
              </button>
              <button type="button" className={styles.socialBtn} onClick={() => showToast({ title: 'Social sign-up not implemented', status: 'info' })}>
                <span className={`${styles.socialIcon} apple`}>A</span>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className={styles.divider}><span>or</span></div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="mc-name" className={styles.fieldLabel}>Name</label>
                <input id="mc-name" ref={nameRef} className={styles.textInput} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" onFocus={focusStyle} onBlur={blurStyle} style={inputBase} />
                {errors.name && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.name}</div>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label htmlFor="mc-reg-email" className={styles.fieldLabel}>Email</label>
                <input id="mc-reg-email" className={styles.textInput} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" onFocus={focusStyle} onBlur={blurStyle} style={inputBase} />
                {errors.email && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label htmlFor="mc-reg-password" style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>Password</label>
                <div className={styles.inputWrapper}>
                  <input id="mc-reg-password" className={styles.textInput} type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" onFocus={focusStyle} onBlur={blurStyle} style={{ ...inputBase, paddingRight: 56 }} />
                  <button type="button" aria-pressed={show} aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} className={`${styles.eyeButton} ${styles.eyeButtonInside}`}>
                    {show ? (
                      <svg className={`${styles.eyeIcon} ${styles.eyeIconActive}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 22 12s-4-7-10-7a9.77 9.77 0 0 0-7 2.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.password}</div>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <span>I agree to the</span>
                  </label>
                  <button type="button" onClick={openTermsModal} style={{ background: 'none', border: 'none', padding: 0, color: PRIMARY, textDecoration: 'underline', cursor: 'pointer' }}>Terms &amp; Conditions</button>
                </div>
                {errors.agree && <div style={{ color: 'crimson', marginTop: 6, fontSize: 13 }}>{errors.agree}</div>}
              </div>

              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 14 }}>Already have an account? </span>
                <button type="button" onClick={() => { onClose(); onSwitch && onSwitch(); }} style={{ color: PRIMARY, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Sign in</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={onClose} style={btnNeutral}>Cancel</button>
                <button type="submit" disabled={loading} style={btnPrimary}>{loading ? 'Creating...' : 'Register'}</button>
              </div>
            </form>

            <div className={styles.modalFooter}>By creating an account you agree to our <button type="button" onClick={openTermsModal} style={{ background: 'none', border: 'none', color: PRIMARY, textDecoration: 'underline', cursor: 'pointer' }}>Terms</button>.</div>
          </div>
        </div>
      </ModalShell>
      <TermsModalContent />
    </>
  );
}

