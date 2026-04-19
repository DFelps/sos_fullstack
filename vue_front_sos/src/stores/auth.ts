import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const DEMO_EMAIL = 'admin@sos.local';
const DEMO_PASSWORD = 'admin123';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('sos_token'));
  const userName = ref(localStorage.getItem('sos_user_name') ?? 'Administrador SOS');

  const isAuthenticated = computed(() => Boolean(token.value));

  const login = (email: string, password: string) => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      token.value = 'sos-demo-token';
      localStorage.setItem('sos_token', token.value);
      localStorage.setItem('sos_user_name', userName.value);
      return true;
    }
    return false;
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('sos_token');
  };

  return { token, userName, isAuthenticated, login, logout, demoEmail: DEMO_EMAIL, demoPassword: DEMO_PASSWORD };
});
