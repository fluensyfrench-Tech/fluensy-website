/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from 'react-hot-toast';
import { showCustomToast } from '../components/showCustomToast';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxuQww9ZWGLhSMxjp-_MkhNEeTh6wgmVDGprz26hY2BZWKjkHpTllwqPhB2drPh1TXhA/exec"; 

export async function registerEmail(email: string) {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error('Network error');

    const data = await res.json();
    if (data.status === "success") {
      showCustomToast("");
    } else {
      toast.error("⚠️ Something went wrong");
    }
  } catch (err) {
    toast.error("⚠️ Failed to register");
  }
}

