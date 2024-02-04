declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        CATALOG_API_URL: string;
        LOGIN_URL: string;
        LOGIN_ME_URL: string;
        ORDER_CREATE_URL: string;
        RABBITMQ_URI: string;
        RABBITMQ_ORDER_EXCHANGE: string;
        RABBITMQ_ORDER_QUEUE: string;
        RABBITMQ_ORDER_ROUTING_KEY: string;
        MYSQL_ORDER_DB: string;
      }
    }
  }
}
