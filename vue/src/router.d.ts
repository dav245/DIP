export {};

declare module "vue-router" {
  interface RouteMeta {
    guest?: boolean;
    layout?: () => Component;
  }
}
