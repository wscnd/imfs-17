declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        CATALOG_API_URL: string;
        LOGIN_URL: string;
        LOGIN_ME_URL: string;
        ORDER_CREATE_URL: string;
        RABBITMQ_URI: string;
        MYSQL_ORDER_DB: string;
        RABBITMQ_EXCHANGE_ORDERS: string;
        RABBITMQ_QUEUE_ORDERS: string;
        RABBITMQ_QUEUE_ORDER_UPDATED: string;
        RABBITMQ_RK_ORDER_CREATED: string;
        RABBITMQ_RK_ORDER_UPDATED: string;
        RABBITMQ_RK_ORDER_FAILED: string;
      }
    }
  }
}
