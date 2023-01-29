export {};

declare module "vue-router" {
  interface RouteMeta {
    guest?: boolean;
    any?: boolean;
    layout?: () => Component;
  }
}
