
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';


const useResetAuthOnMount = () => {
  const { resetAuthState } = useAuthStore()
  // const resetAuthState = useAuthStore((state) => state.resetAuthState);
  useEffect(() => {
  try {
    resetAuthState();
    console.log('worked')
  } catch (error) {
    console.error('Failed to reset auth state:', error);
  }
}, []);
};

export default useResetAuthOnMount;
