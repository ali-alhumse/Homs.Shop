export const themeService = {
  getCurrentTheme() {
    try {
      const stored = localStorage.getItem('homs-theme');
      return stored || 'light';
    } catch {
      return 'light';
    }
  },

  setTheme(theme) {
    try {
      localStorage.setItem('homs-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // localStorage not available
    }
  },
};
