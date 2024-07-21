// refer to wrangler.toml for definition of MY_VAR
export interface Bindings {
  MY_VAR: string
}

// use the following pattern to define types of context variables --
// export interface Variables { ... }

export type AppContext = {
  Bindings: Bindings
  // Variables: {}
}
