export const Router = {
  routes: {},
  
  init(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Always start at home when the application runs
    // This ignores any leftover /#/modules in the address bar from live previews
    window.location.hash = '#/home';
    this.handleRoute();
  },

  handleRoute() {
    if (!window.location.hash) {
      window.location.hash = '#/home';
      return;
    }
    
    const hash = window.location.hash;
    const [path, param] = hash.split('/').slice(1);
    
    const route = this.routes[path] || this.routes['home'];
    route(param);
  },

  navigate(path) {
    window.location.hash = `#/${path}`;
  }
};
