
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    meetings: MeetingPayload<ExtArgs>[]
    participants: MeetingParticipantPayload<ExtArgs>[]
    reports: ReportPayload<ExtArgs>[]
    auditLogs: AuditLogPayload<ExtArgs>[]
    notifications: NotificationPayload<ExtArgs>[]
    ownedActionItems: ReportActionItemPayload<ExtArgs>[]
    uploadedAttachments: AttachmentPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    name: string | null
    image: string | null
    hashedPassword: string | null
    role: Role
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type MeetingPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Meeting"
  objects: {
    organizer: UserPayload<ExtArgs>
    participants: MeetingParticipantPayload<ExtArgs>[]
    attachments: AttachmentPayload<ExtArgs>[]
    report: ReportPayload<ExtArgs> | null
    notifications: NotificationPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    title: string
    description: string | null
    type: string | null
    date: Date
    startTime: Date | null
    endTime: Date | null
    location: string | null
    agenda: string | null
    status: MeetingStatus
    organizerId: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["meeting"]>
  composites: {}
}

/**
 * Model Meeting
 * 
 */
export type Meeting = runtime.Types.DefaultSelection<MeetingPayload>
export type MeetingParticipantPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "MeetingParticipant"
  objects: {
    meeting: MeetingPayload<ExtArgs>
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    meetingId: string
    userId: string
    status: ParticipantStatus
    role: string | null
    createdAt: Date
  }, ExtArgs["result"]["meetingParticipant"]>
  composites: {}
}

/**
 * Model MeetingParticipant
 * 
 */
export type MeetingParticipant = runtime.Types.DefaultSelection<MeetingParticipantPayload>
export type NotificationPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Notification"
  objects: {
    meeting: MeetingPayload<ExtArgs> | null
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    meetingId: string | null
    userId: string
    channel: NotificationChannel
    scheduledAt: Date
    sentAt: Date | null
    status: NotificationStatus
    createdAt: Date
  }, ExtArgs["result"]["notification"]>
  composites: {}
}

/**
 * Model Notification
 * 
 */
export type Notification = runtime.Types.DefaultSelection<NotificationPayload>
export type ReportPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Report"
  objects: {
    meeting: MeetingPayload<ExtArgs>
    author: UserPayload<ExtArgs>
    actionItems: ReportActionItemPayload<ExtArgs>[]
    attachments: AttachmentPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    meetingId: string
    title: string
    summary: string | null
    content: string | null
    status: ReportStatus
    authorId: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["report"]>
  composites: {}
}

/**
 * Model Report
 * 
 */
export type Report = runtime.Types.DefaultSelection<ReportPayload>
export type ReportActionItemPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "ReportActionItem"
  objects: {
    report: ReportPayload<ExtArgs>
    owner: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    reportId: string
    description: string
    ownerId: string | null
    dueDate: Date | null
    done: boolean
    createdAt: Date
  }, ExtArgs["result"]["reportActionItem"]>
  composites: {}
}

/**
 * Model ReportActionItem
 * 
 */
export type ReportActionItem = runtime.Types.DefaultSelection<ReportActionItemPayload>
export type AttachmentPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Attachment"
  objects: {
    meeting: MeetingPayload<ExtArgs> | null
    report: ReportPayload<ExtArgs> | null
    uploadedBy: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    filename: string
    url: string
    meetingId: string | null
    reportId: string | null
    uploadedById: string | null
    createdAt: Date
  }, ExtArgs["result"]["attachment"]>
  composites: {}
}

/**
 * Model Attachment
 * 
 */
export type Attachment = runtime.Types.DefaultSelection<AttachmentPayload>
export type AuditLogPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "AuditLog"
  objects: {
    actor: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    model: string
    modelId: string
    action: string
    actorId: string | null
    timestamp: Date
    diff: Prisma.JsonValue | null
  }, ExtArgs["result"]["auditLog"]>
  composites: {}
}

/**
 * Model AuditLog
 * 
 */
export type AuditLog = runtime.Types.DefaultSelection<AuditLogPayload>

/**
 * Enums
 */

export const Role: {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  PARTICIPANT: 'PARTICIPANT',
  REPORTER: 'REPORTER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const MeetingStatus: {
  PLANNED: 'PLANNED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type MeetingStatus = (typeof MeetingStatus)[keyof typeof MeetingStatus]


export const ParticipantStatus: {
  INVITED: 'INVITED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED',
  ATTENDED: 'ATTENDED',
  ABSENT: 'ABSENT'
};

export type ParticipantStatus = (typeof ParticipantStatus)[keyof typeof ParticipantStatus]


export const NotificationChannel: {
  EMAIL: 'EMAIL',
  IN_APP: 'IN_APP',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP'
};

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel]


export const NotificationStatus: {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const ReportStatus: {
  DRAFT: 'DRAFT',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  ARCHIVED: 'ARCHIVED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meetings
    * const meetings = await prisma.meeting.findMany()
    * ```
    */
  get meeting(): Prisma.MeetingDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.meetingParticipant`: Exposes CRUD operations for the **MeetingParticipant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeetingParticipants
    * const meetingParticipants = await prisma.meetingParticipant.findMany()
    * ```
    */
  get meetingParticipant(): Prisma.MeetingParticipantDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.reportActionItem`: Exposes CRUD operations for the **ReportActionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportActionItems
    * const reportActionItems = await prisma.reportActionItem.findMany()
    * ```
    */
  get reportActionItem(): Prisma.ReportActionItemDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Meeting: 'Meeting',
    MeetingParticipant: 'MeetingParticipant',
    Notification: 'Notification',
    Report: 'Report',
    ReportActionItem: 'ReportActionItem',
    Attachment: 'Attachment',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'meeting' | 'meetingParticipant' | 'notification' | 'report' | 'reportActionItem' | 'attachment' | 'auditLog'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: UserPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Meeting: {
        payload: MeetingPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.MeetingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          findFirst: {
            args: Prisma.MeetingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          findMany: {
            args: Prisma.MeetingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>[]
          }
          create: {
            args: Prisma.MeetingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          createMany: {
            args: Prisma.MeetingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MeetingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          update: {
            args: Prisma.MeetingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          deleteMany: {
            args: Prisma.MeetingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MeetingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingPayload>
          }
          aggregate: {
            args: Prisma.MeetingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMeeting>
          }
          groupBy: {
            args: Prisma.MeetingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MeetingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingCountArgs<ExtArgs>,
            result: $Utils.Optional<MeetingCountAggregateOutputType> | number
          }
        }
      }
      MeetingParticipant: {
        payload: MeetingParticipantPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.MeetingParticipantFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingParticipantFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          findFirst: {
            args: Prisma.MeetingParticipantFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingParticipantFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          findMany: {
            args: Prisma.MeetingParticipantFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>[]
          }
          create: {
            args: Prisma.MeetingParticipantCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          createMany: {
            args: Prisma.MeetingParticipantCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MeetingParticipantDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          update: {
            args: Prisma.MeetingParticipantUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          deleteMany: {
            args: Prisma.MeetingParticipantDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingParticipantUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MeetingParticipantUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<MeetingParticipantPayload>
          }
          aggregate: {
            args: Prisma.MeetingParticipantAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMeetingParticipant>
          }
          groupBy: {
            args: Prisma.MeetingParticipantGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MeetingParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingParticipantCountArgs<ExtArgs>,
            result: $Utils.Optional<MeetingParticipantCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: NotificationPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>,
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: ReportPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>,
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      ReportActionItem: {
        payload: ReportActionItemPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ReportActionItemFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportActionItemFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          findFirst: {
            args: Prisma.ReportActionItemFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportActionItemFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          findMany: {
            args: Prisma.ReportActionItemFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>[]
          }
          create: {
            args: Prisma.ReportActionItemCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          createMany: {
            args: Prisma.ReportActionItemCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReportActionItemDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          update: {
            args: Prisma.ReportActionItemUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          deleteMany: {
            args: Prisma.ReportActionItemDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReportActionItemUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReportActionItemUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportActionItemPayload>
          }
          aggregate: {
            args: Prisma.ReportActionItemAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReportActionItem>
          }
          groupBy: {
            args: Prisma.ReportActionItemGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReportActionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportActionItemCountArgs<ExtArgs>,
            result: $Utils.Optional<ReportActionItemCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: AttachmentPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>,
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: AuditLogPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>,
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    meetings: number
    participants: number
    reports: number
    auditLogs: number
    notifications: number
    ownedActionItems: number
    uploadedAttachments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meetings?: boolean | UserCountOutputTypeCountMeetingsArgs
    participants?: boolean | UserCountOutputTypeCountParticipantsArgs
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    ownedActionItems?: boolean | UserCountOutputTypeCountOwnedActionItemsArgs
    uploadedAttachments?: boolean | UserCountOutputTypeCountUploadedAttachmentsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMeetingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedActionItemsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportActionItemWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedAttachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }



  /**
   * Count Type MeetingCountOutputType
   */


  export type MeetingCountOutputType = {
    participants: number
    attachments: number
    notifications: number
  }

  export type MeetingCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    participants?: boolean | MeetingCountOutputTypeCountParticipantsArgs
    attachments?: boolean | MeetingCountOutputTypeCountAttachmentsArgs
    notifications?: boolean | MeetingCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes

  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingCountOutputType
     */
    select?: MeetingCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
  }


  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }


  /**
   * MeetingCountOutputType without action
   */
  export type MeetingCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }



  /**
   * Count Type ReportCountOutputType
   */


  export type ReportCountOutputType = {
    actionItems: number
    attachments: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    actionItems?: boolean | ReportCountOutputTypeCountActionItemsArgs
    attachments?: boolean | ReportCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountActionItemsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportActionItemWhereInput
  }


  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    hashedPassword: string | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    hashedPassword: string | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    hashedPassword: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    hashedPassword: string | null
    role: Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    participants?: boolean | User$participantsArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    ownedActionItems?: boolean | User$ownedActionItemsArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meetings?: boolean | User$meetingsArgs<ExtArgs>
    participants?: boolean | User$participantsArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    ownedActionItems?: boolean | User$ownedActionItemsArgs<ExtArgs>
    uploadedAttachments?: boolean | User$uploadedAttachmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    meetings<T extends User$meetingsArgs<ExtArgs> = {}>(args?: Subset<T, User$meetingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findMany', never>| Null>;

    participants<T extends User$participantsArgs<ExtArgs> = {}>(args?: Subset<T, User$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findMany', never>| Null>;

    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findMany', never>| Null>;

    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findMany', never>| Null>;

    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findMany', never>| Null>;

    ownedActionItems<T extends User$ownedActionItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedActionItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findMany', never>| Null>;

    uploadedAttachments<T extends User$uploadedAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.meetings
   */
  export type User$meetingsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    where?: MeetingWhereInput
    orderBy?: Enumerable<MeetingOrderByWithRelationInput>
    cursor?: MeetingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MeetingScalarFieldEnum>
  }


  /**
   * User.participants
   */
  export type User$participantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    where?: MeetingParticipantWhereInput
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    cursor?: MeetingParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MeetingParticipantScalarFieldEnum>
  }


  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: Enumerable<AuditLogOrderByWithRelationInput>
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AuditLogScalarFieldEnum>
  }


  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * User.ownedActionItems
   */
  export type User$ownedActionItemsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    where?: ReportActionItemWhereInput
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    cursor?: ReportActionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportActionItemScalarFieldEnum>
  }


  /**
   * User.uploadedAttachments
   */
  export type User$uploadedAttachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Meeting
   */


  export type AggregateMeeting = {
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  export type MeetingMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    date: Date | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    agenda: string | null
    status: MeetingStatus | null
    organizerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: string | null
    date: Date | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    agenda: string | null
    status: MeetingStatus | null
    organizerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MeetingCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    date: number
    startTime: number
    endTime: number
    location: number
    agenda: number
    status: number
    organizerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MeetingMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    location?: true
    agenda?: true
    status?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    location?: true
    agenda?: true
    status?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MeetingCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    date?: true
    startTime?: true
    endTime?: true
    location?: true
    agenda?: true
    status?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MeetingAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meeting to aggregate.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: Enumerable<MeetingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meetings
    **/
    _count?: true | MeetingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingMaxAggregateInputType
  }

  export type GetMeetingAggregateType<T extends MeetingAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting[P]>
      : GetScalarType<T[P], AggregateMeeting[P]>
  }




  export type MeetingGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MeetingWhereInput
    orderBy?: Enumerable<MeetingOrderByWithAggregationInput>
    by: MeetingScalarFieldEnum[]
    having?: MeetingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingCountAggregateInputType | true
    _min?: MeetingMinAggregateInputType
    _max?: MeetingMaxAggregateInputType
  }


  export type MeetingGroupByOutputType = {
    id: string
    title: string
    description: string | null
    type: string | null
    date: Date
    startTime: Date | null
    endTime: Date | null
    location: string | null
    agenda: string | null
    status: MeetingStatus
    organizerId: string
    createdAt: Date
    updatedAt: Date
    _count: MeetingCountAggregateOutputType | null
    _min: MeetingMinAggregateOutputType | null
    _max: MeetingMaxAggregateOutputType | null
  }

  type GetMeetingGroupByPayload<T extends MeetingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MeetingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingGroupByOutputType[P]>
        }
      >
    >


  export type MeetingSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    agenda?: boolean
    status?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | UserArgs<ExtArgs>
    participants?: boolean | Meeting$participantsArgs<ExtArgs>
    attachments?: boolean | Meeting$attachmentsArgs<ExtArgs>
    report?: boolean | ReportArgs<ExtArgs>
    notifications?: boolean | Meeting$notificationsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["meeting"]>

  export type MeetingSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    agenda?: boolean
    status?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MeetingInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    organizer?: boolean | UserArgs<ExtArgs>
    participants?: boolean | Meeting$participantsArgs<ExtArgs>
    attachments?: boolean | Meeting$attachmentsArgs<ExtArgs>
    report?: boolean | ReportArgs<ExtArgs>
    notifications?: boolean | Meeting$notificationsArgs<ExtArgs>
    _count?: boolean | MeetingCountOutputTypeArgs<ExtArgs>
  }


  type MeetingGetPayload<S extends boolean | null | undefined | MeetingArgs> = $Types.GetResult<MeetingPayload, S>

  type MeetingCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<MeetingFindManyArgs, 'select' | 'include'> & {
      select?: MeetingCountAggregateInputType | true
    }

  export interface MeetingDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Meeting'], meta: { name: 'Meeting' } }
    /**
     * Find zero or one Meeting that matches the filter.
     * @param {MeetingFindUniqueArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MeetingFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MeetingFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Meeting'> extends True ? Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Meeting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MeetingFindUniqueOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MeetingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Meeting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MeetingFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MeetingFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Meeting'> extends True ? Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Meeting that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindFirstOrThrowArgs} args - Arguments to find a Meeting
     * @example
     * // Get one Meeting
     * const meeting = await prisma.meeting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MeetingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Meetings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meetings
     * const meetings = await prisma.meeting.findMany()
     * 
     * // Get first 10 Meetings
     * const meetings = await prisma.meeting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingWithIdOnly = await prisma.meeting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MeetingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Meeting.
     * @param {MeetingCreateArgs} args - Arguments to create a Meeting.
     * @example
     * // Create one Meeting
     * const Meeting = await prisma.meeting.create({
     *   data: {
     *     // ... data to create a Meeting
     *   }
     * })
     * 
    **/
    create<T extends MeetingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingCreateArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Meetings.
     *     @param {MeetingCreateManyArgs} args - Arguments to create many Meetings.
     *     @example
     *     // Create many Meetings
     *     const meeting = await prisma.meeting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MeetingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Meeting.
     * @param {MeetingDeleteArgs} args - Arguments to delete one Meeting.
     * @example
     * // Delete one Meeting
     * const Meeting = await prisma.meeting.delete({
     *   where: {
     *     // ... filter to delete one Meeting
     *   }
     * })
     * 
    **/
    delete<T extends MeetingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingDeleteArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Meeting.
     * @param {MeetingUpdateArgs} args - Arguments to update one Meeting.
     * @example
     * // Update one Meeting
     * const meeting = await prisma.meeting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MeetingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingUpdateArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Meetings.
     * @param {MeetingDeleteManyArgs} args - Arguments to filter Meetings to delete.
     * @example
     * // Delete a few Meetings
     * const { count } = await prisma.meeting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MeetingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meetings
     * const meeting = await prisma.meeting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MeetingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Meeting.
     * @param {MeetingUpsertArgs} args - Arguments to update or create a Meeting.
     * @example
     * // Update or create a Meeting
     * const meeting = await prisma.meeting.upsert({
     *   create: {
     *     // ... data to create a Meeting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting we want to update
     *   }
     * })
    **/
    upsert<T extends MeetingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingUpsertArgs<ExtArgs>>
    ): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Meetings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingCountArgs} args - Arguments to filter Meetings to count.
     * @example
     * // Count the number of Meetings
     * const count = await prisma.meeting.count({
     *   where: {
     *     // ... the filter for the Meetings we want to count
     *   }
     * })
    **/
    count<T extends MeetingCountArgs>(
      args?: Subset<T, MeetingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingAggregateArgs>(args: Subset<T, MeetingAggregateArgs>): Prisma.PrismaPromise<GetMeetingAggregateType<T>>

    /**
     * Group by Meeting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingGroupByArgs['orderBy'] }
        : { orderBy?: MeetingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Meeting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MeetingClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    organizer<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    participants<T extends Meeting$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findMany', never>| Null>;

    attachments<T extends Meeting$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findMany', never>| Null>;

    report<T extends ReportArgs<ExtArgs> = {}>(args?: Subset<T, ReportArgs<ExtArgs>>): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    notifications<T extends Meeting$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Meeting$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Meeting base type for findUnique actions
   */
  export type MeetingFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }

  /**
   * Meeting findUnique
   */
  export interface MeetingFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MeetingFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Meeting findUniqueOrThrow
   */
  export type MeetingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where: MeetingWhereUniqueInput
  }


  /**
   * Meeting base type for findFirst actions
   */
  export type MeetingFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: Enumerable<MeetingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: Enumerable<MeetingScalarFieldEnum>
  }

  /**
   * Meeting findFirst
   */
  export interface MeetingFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MeetingFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Meeting findFirstOrThrow
   */
  export type MeetingFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meeting to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: Enumerable<MeetingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meetings.
     */
    distinct?: Enumerable<MeetingScalarFieldEnum>
  }


  /**
   * Meeting findMany
   */
  export type MeetingFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter, which Meetings to fetch.
     */
    where?: MeetingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meetings to fetch.
     */
    orderBy?: Enumerable<MeetingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meetings.
     */
    cursor?: MeetingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meetings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meetings.
     */
    skip?: number
    distinct?: Enumerable<MeetingScalarFieldEnum>
  }


  /**
   * Meeting create
   */
  export type MeetingCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to create a Meeting.
     */
    data: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
  }


  /**
   * Meeting createMany
   */
  export type MeetingCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meetings.
     */
    data: Enumerable<MeetingCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Meeting update
   */
  export type MeetingUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The data needed to update a Meeting.
     */
    data: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
    /**
     * Choose, which Meeting to update.
     */
    where: MeetingWhereUniqueInput
  }


  /**
   * Meeting updateMany
   */
  export type MeetingUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meetings.
     */
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyInput>
    /**
     * Filter which Meetings to update
     */
    where?: MeetingWhereInput
  }


  /**
   * Meeting upsert
   */
  export type MeetingUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * The filter to search for the Meeting to update in case it exists.
     */
    where: MeetingWhereUniqueInput
    /**
     * In case the Meeting found by the `where` argument doesn't exist, create a new Meeting with this data.
     */
    create: XOR<MeetingCreateInput, MeetingUncheckedCreateInput>
    /**
     * In case the Meeting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingUpdateInput, MeetingUncheckedUpdateInput>
  }


  /**
   * Meeting delete
   */
  export type MeetingDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
    /**
     * Filter which Meeting to delete.
     */
    where: MeetingWhereUniqueInput
  }


  /**
   * Meeting deleteMany
   */
  export type MeetingDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meetings to delete
     */
    where?: MeetingWhereInput
  }


  /**
   * Meeting.participants
   */
  export type Meeting$participantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    where?: MeetingParticipantWhereInput
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    cursor?: MeetingParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MeetingParticipantScalarFieldEnum>
  }


  /**
   * Meeting.attachments
   */
  export type Meeting$attachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }


  /**
   * Meeting.notifications
   */
  export type Meeting$notificationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Meeting without action
   */
  export type MeetingArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting
     */
    select?: MeetingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingInclude<ExtArgs> | null
  }



  /**
   * Model MeetingParticipant
   */


  export type AggregateMeetingParticipant = {
    _count: MeetingParticipantCountAggregateOutputType | null
    _min: MeetingParticipantMinAggregateOutputType | null
    _max: MeetingParticipantMaxAggregateOutputType | null
  }

  export type MeetingParticipantMinAggregateOutputType = {
    id: string | null
    meetingId: string | null
    userId: string | null
    status: ParticipantStatus | null
    role: string | null
    createdAt: Date | null
  }

  export type MeetingParticipantMaxAggregateOutputType = {
    id: string | null
    meetingId: string | null
    userId: string | null
    status: ParticipantStatus | null
    role: string | null
    createdAt: Date | null
  }

  export type MeetingParticipantCountAggregateOutputType = {
    id: number
    meetingId: number
    userId: number
    status: number
    role: number
    createdAt: number
    _all: number
  }


  export type MeetingParticipantMinAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    status?: true
    role?: true
    createdAt?: true
  }

  export type MeetingParticipantMaxAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    status?: true
    role?: true
    createdAt?: true
  }

  export type MeetingParticipantCountAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    status?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type MeetingParticipantAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingParticipant to aggregate.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeetingParticipants
    **/
    _count?: true | MeetingParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingParticipantMaxAggregateInputType
  }

  export type GetMeetingParticipantAggregateType<T extends MeetingParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateMeetingParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingParticipant[P]>
      : GetScalarType<T[P], AggregateMeetingParticipant[P]>
  }




  export type MeetingParticipantGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: MeetingParticipantWhereInput
    orderBy?: Enumerable<MeetingParticipantOrderByWithAggregationInput>
    by: MeetingParticipantScalarFieldEnum[]
    having?: MeetingParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingParticipantCountAggregateInputType | true
    _min?: MeetingParticipantMinAggregateInputType
    _max?: MeetingParticipantMaxAggregateInputType
  }


  export type MeetingParticipantGroupByOutputType = {
    id: string
    meetingId: string
    userId: string
    status: ParticipantStatus
    role: string | null
    createdAt: Date
    _count: MeetingParticipantCountAggregateOutputType | null
    _min: MeetingParticipantMinAggregateOutputType | null
    _max: MeetingParticipantMaxAggregateOutputType | null
  }

  type GetMeetingParticipantGroupByPayload<T extends MeetingParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MeetingParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingParticipantGroupByOutputType[P]>
        }
      >
    >


  export type MeetingParticipantSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    userId?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
    meeting?: boolean | MeetingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["meetingParticipant"]>

  export type MeetingParticipantSelectScalar = {
    id?: boolean
    meetingId?: boolean
    userId?: boolean
    status?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type MeetingParticipantInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }


  type MeetingParticipantGetPayload<S extends boolean | null | undefined | MeetingParticipantArgs> = $Types.GetResult<MeetingParticipantPayload, S>

  type MeetingParticipantCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<MeetingParticipantFindManyArgs, 'select' | 'include'> & {
      select?: MeetingParticipantCountAggregateInputType | true
    }

  export interface MeetingParticipantDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeetingParticipant'], meta: { name: 'MeetingParticipant' } }
    /**
     * Find zero or one MeetingParticipant that matches the filter.
     * @param {MeetingParticipantFindUniqueArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MeetingParticipantFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MeetingParticipantFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MeetingParticipant'> extends True ? Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one MeetingParticipant that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MeetingParticipantFindUniqueOrThrowArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MeetingParticipantFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingParticipantFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first MeetingParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindFirstArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MeetingParticipantFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MeetingParticipantFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MeetingParticipant'> extends True ? Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first MeetingParticipant that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindFirstOrThrowArgs} args - Arguments to find a MeetingParticipant
     * @example
     * // Get one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MeetingParticipantFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingParticipantFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more MeetingParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingParticipants
     * const meetingParticipants = await prisma.meetingParticipant.findMany()
     * 
     * // Get first 10 MeetingParticipants
     * const meetingParticipants = await prisma.meetingParticipant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingParticipantWithIdOnly = await prisma.meetingParticipant.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MeetingParticipantFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingParticipantFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a MeetingParticipant.
     * @param {MeetingParticipantCreateArgs} args - Arguments to create a MeetingParticipant.
     * @example
     * // Create one MeetingParticipant
     * const MeetingParticipant = await prisma.meetingParticipant.create({
     *   data: {
     *     // ... data to create a MeetingParticipant
     *   }
     * })
     * 
    **/
    create<T extends MeetingParticipantCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingParticipantCreateArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many MeetingParticipants.
     *     @param {MeetingParticipantCreateManyArgs} args - Arguments to create many MeetingParticipants.
     *     @example
     *     // Create many MeetingParticipants
     *     const meetingParticipant = await prisma.meetingParticipant.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MeetingParticipantCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingParticipantCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MeetingParticipant.
     * @param {MeetingParticipantDeleteArgs} args - Arguments to delete one MeetingParticipant.
     * @example
     * // Delete one MeetingParticipant
     * const MeetingParticipant = await prisma.meetingParticipant.delete({
     *   where: {
     *     // ... filter to delete one MeetingParticipant
     *   }
     * })
     * 
    **/
    delete<T extends MeetingParticipantDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingParticipantDeleteArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one MeetingParticipant.
     * @param {MeetingParticipantUpdateArgs} args - Arguments to update one MeetingParticipant.
     * @example
     * // Update one MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MeetingParticipantUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingParticipantUpdateArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more MeetingParticipants.
     * @param {MeetingParticipantDeleteManyArgs} args - Arguments to filter MeetingParticipants to delete.
     * @example
     * // Delete a few MeetingParticipants
     * const { count } = await prisma.meetingParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MeetingParticipantDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MeetingParticipantDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingParticipants
     * const meetingParticipant = await prisma.meetingParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MeetingParticipantUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingParticipantUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MeetingParticipant.
     * @param {MeetingParticipantUpsertArgs} args - Arguments to update or create a MeetingParticipant.
     * @example
     * // Update or create a MeetingParticipant
     * const meetingParticipant = await prisma.meetingParticipant.upsert({
     *   create: {
     *     // ... data to create a MeetingParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingParticipant we want to update
     *   }
     * })
    **/
    upsert<T extends MeetingParticipantUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MeetingParticipantUpsertArgs<ExtArgs>>
    ): Prisma__MeetingParticipantClient<$Types.GetResult<MeetingParticipantPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of MeetingParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantCountArgs} args - Arguments to filter MeetingParticipants to count.
     * @example
     * // Count the number of MeetingParticipants
     * const count = await prisma.meetingParticipant.count({
     *   where: {
     *     // ... the filter for the MeetingParticipants we want to count
     *   }
     * })
    **/
    count<T extends MeetingParticipantCountArgs>(
      args?: Subset<T, MeetingParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeetingParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingParticipantAggregateArgs>(args: Subset<T, MeetingParticipantAggregateArgs>): Prisma.PrismaPromise<GetMeetingParticipantAggregateType<T>>

    /**
     * Group by MeetingParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingParticipantGroupByArgs['orderBy'] }
        : { orderBy?: MeetingParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingParticipant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MeetingParticipantClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    meeting<T extends MeetingArgs<ExtArgs> = {}>(args?: Subset<T, MeetingArgs<ExtArgs>>): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * MeetingParticipant base type for findUnique actions
   */
  export type MeetingParticipantFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where: MeetingParticipantWhereUniqueInput
  }

  /**
   * MeetingParticipant findUnique
   */
  export interface MeetingParticipantFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MeetingParticipantFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MeetingParticipant findUniqueOrThrow
   */
  export type MeetingParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where: MeetingParticipantWhereUniqueInput
  }


  /**
   * MeetingParticipant base type for findFirst actions
   */
  export type MeetingParticipantFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingParticipants.
     */
    distinct?: Enumerable<MeetingParticipantScalarFieldEnum>
  }

  /**
   * MeetingParticipant findFirst
   */
  export interface MeetingParticipantFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends MeetingParticipantFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MeetingParticipant findFirstOrThrow
   */
  export type MeetingParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipant to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingParticipants.
     */
    distinct?: Enumerable<MeetingParticipantScalarFieldEnum>
  }


  /**
   * MeetingParticipant findMany
   */
  export type MeetingParticipantFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter, which MeetingParticipants to fetch.
     */
    where?: MeetingParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingParticipants to fetch.
     */
    orderBy?: Enumerable<MeetingParticipantOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeetingParticipants.
     */
    cursor?: MeetingParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingParticipants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingParticipants.
     */
    skip?: number
    distinct?: Enumerable<MeetingParticipantScalarFieldEnum>
  }


  /**
   * MeetingParticipant create
   */
  export type MeetingParticipantCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a MeetingParticipant.
     */
    data: XOR<MeetingParticipantCreateInput, MeetingParticipantUncheckedCreateInput>
  }


  /**
   * MeetingParticipant createMany
   */
  export type MeetingParticipantCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingParticipants.
     */
    data: Enumerable<MeetingParticipantCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MeetingParticipant update
   */
  export type MeetingParticipantUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a MeetingParticipant.
     */
    data: XOR<MeetingParticipantUpdateInput, MeetingParticipantUncheckedUpdateInput>
    /**
     * Choose, which MeetingParticipant to update.
     */
    where: MeetingParticipantWhereUniqueInput
  }


  /**
   * MeetingParticipant updateMany
   */
  export type MeetingParticipantUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingParticipants.
     */
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyInput>
    /**
     * Filter which MeetingParticipants to update
     */
    where?: MeetingParticipantWhereInput
  }


  /**
   * MeetingParticipant upsert
   */
  export type MeetingParticipantUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the MeetingParticipant to update in case it exists.
     */
    where: MeetingParticipantWhereUniqueInput
    /**
     * In case the MeetingParticipant found by the `where` argument doesn't exist, create a new MeetingParticipant with this data.
     */
    create: XOR<MeetingParticipantCreateInput, MeetingParticipantUncheckedCreateInput>
    /**
     * In case the MeetingParticipant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingParticipantUpdateInput, MeetingParticipantUncheckedUpdateInput>
  }


  /**
   * MeetingParticipant delete
   */
  export type MeetingParticipantDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
    /**
     * Filter which MeetingParticipant to delete.
     */
    where: MeetingParticipantWhereUniqueInput
  }


  /**
   * MeetingParticipant deleteMany
   */
  export type MeetingParticipantDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingParticipants to delete
     */
    where?: MeetingParticipantWhereInput
  }


  /**
   * MeetingParticipant without action
   */
  export type MeetingParticipantArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingParticipant
     */
    select?: MeetingParticipantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MeetingParticipantInclude<ExtArgs> | null
  }



  /**
   * Model Notification
   */


  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    meetingId: string | null
    userId: string | null
    channel: NotificationChannel | null
    scheduledAt: Date | null
    sentAt: Date | null
    status: NotificationStatus | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    meetingId: string | null
    userId: string | null
    channel: NotificationChannel | null
    scheduledAt: Date | null
    sentAt: Date | null
    status: NotificationStatus | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    meetingId: number
    userId: number
    channel: number
    scheduledAt: number
    sentAt: number
    status: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    channel?: true
    scheduledAt?: true
    sentAt?: true
    status?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    channel?: true
    scheduledAt?: true
    sentAt?: true
    status?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    meetingId?: true
    userId?: true
    channel?: true
    scheduledAt?: true
    sentAt?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: Enumerable<NotificationOrderByWithAggregationInput>
    by: NotificationScalarFieldEnum[]
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }


  export type NotificationGroupByOutputType = {
    id: string
    meetingId: string | null
    userId: string
    channel: NotificationChannel
    scheduledAt: Date
    sentAt: Date | null
    status: NotificationStatus
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    userId?: boolean
    channel?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    status?: boolean
    createdAt?: boolean
    meeting?: boolean | MeetingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    meetingId?: boolean
    userId?: boolean
    channel?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
  }


  type NotificationGetPayload<S extends boolean | null | undefined | NotificationArgs> = $Types.GetResult<NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NotificationFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Notification'> extends True ? Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NotificationFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Notification'> extends True ? Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends NotificationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
    **/
    create<T extends NotificationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Notifications.
     *     @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     *     @example
     *     // Create many Notifications
     *     const notification = await prisma.notification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends NotificationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
    **/
    delete<T extends NotificationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NotificationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NotificationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NotificationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
    **/
    upsert<T extends NotificationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>
    ): Prisma__NotificationClient<$Types.GetResult<NotificationPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    meeting<T extends MeetingArgs<ExtArgs> = {}>(args?: Subset<T, MeetingArgs<ExtArgs>>): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Notification base type for findUnique actions
   */
  export type NotificationFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUnique
   */
  export interface NotificationFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends NotificationFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification base type for findFirst actions
   */
  export type NotificationFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }

  /**
   * Notification findFirst
   */
  export interface NotificationFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends NotificationFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Enumerable<NotificationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: Enumerable<NotificationScalarFieldEnum>
  }


  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }


  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: Enumerable<NotificationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }


  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }


  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }


  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }


  /**
   * Notification without action
   */
  export type NotificationArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: NotificationInclude<ExtArgs> | null
  }



  /**
   * Model Report
   */


  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    meetingId: string | null
    title: string | null
    summary: string | null
    content: string | null
    status: ReportStatus | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    meetingId: string | null
    title: string | null
    summary: string | null
    content: string | null
    status: ReportStatus | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    meetingId: number
    title: number
    summary: number
    content: number
    status: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    meetingId?: true
    title?: true
    summary?: true
    content?: true
    status?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    meetingId?: true
    title?: true
    summary?: true
    content?: true
    status?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    meetingId?: true
    title?: true
    summary?: true
    content?: true
    status?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithAggregationInput>
    by: ReportScalarFieldEnum[]
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }


  export type ReportGroupByOutputType = {
    id: string
    meetingId: string
    title: string
    summary: string | null
    content: string | null
    status: ReportStatus
    authorId: string
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    meetingId?: boolean
    title?: boolean
    summary?: boolean
    content?: boolean
    status?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    meeting?: boolean | MeetingArgs<ExtArgs>
    author?: boolean | UserArgs<ExtArgs>
    actionItems?: boolean | Report$actionItemsArgs<ExtArgs>
    attachments?: boolean | Report$attachmentsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    meetingId?: boolean
    title?: boolean
    summary?: boolean
    content?: boolean
    status?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingArgs<ExtArgs>
    author?: boolean | UserArgs<ExtArgs>
    actionItems?: boolean | Report$actionItemsArgs<ExtArgs>
    attachments?: boolean | Report$attachmentsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>
  }


  type ReportGetPayload<S extends boolean | null | undefined | ReportArgs> = $Types.GetResult<ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Report'> extends True ? Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Report'> extends True ? Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReportFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
    **/
    create<T extends ReportCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportCreateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Reports.
     *     @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const report = await prisma.report.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
    **/
    delete<T extends ReportDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReportUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReportUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
    **/
    upsert<T extends ReportUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    meeting<T extends MeetingArgs<ExtArgs> = {}>(args?: Subset<T, MeetingArgs<ExtArgs>>): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    author<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    actionItems<T extends Report$actionItemsArgs<ExtArgs> = {}>(args?: Subset<T, Report$actionItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findMany', never>| Null>;

    attachments<T extends Report$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Report$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Report base type for findUnique actions
   */
  export type ReportFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUnique
   */
  export interface ReportFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report base type for findFirst actions
   */
  export type ReportFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }

  /**
   * Report findFirst
   */
  export interface ReportFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }


  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: Enumerable<ReportCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }


  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }


  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }


  /**
   * Report.actionItems
   */
  export type Report$actionItemsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    where?: ReportActionItemWhereInput
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    cursor?: ReportActionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportActionItemScalarFieldEnum>
  }


  /**
   * Report.attachments
   */
  export type Report$attachmentsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }


  /**
   * Report without action
   */
  export type ReportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
  }



  /**
   * Model ReportActionItem
   */


  export type AggregateReportActionItem = {
    _count: ReportActionItemCountAggregateOutputType | null
    _min: ReportActionItemMinAggregateOutputType | null
    _max: ReportActionItemMaxAggregateOutputType | null
  }

  export type ReportActionItemMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    description: string | null
    ownerId: string | null
    dueDate: Date | null
    done: boolean | null
    createdAt: Date | null
  }

  export type ReportActionItemMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    description: string | null
    ownerId: string | null
    dueDate: Date | null
    done: boolean | null
    createdAt: Date | null
  }

  export type ReportActionItemCountAggregateOutputType = {
    id: number
    reportId: number
    description: number
    ownerId: number
    dueDate: number
    done: number
    createdAt: number
    _all: number
  }


  export type ReportActionItemMinAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    ownerId?: true
    dueDate?: true
    done?: true
    createdAt?: true
  }

  export type ReportActionItemMaxAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    ownerId?: true
    dueDate?: true
    done?: true
    createdAt?: true
  }

  export type ReportActionItemCountAggregateInputType = {
    id?: true
    reportId?: true
    description?: true
    ownerId?: true
    dueDate?: true
    done?: true
    createdAt?: true
    _all?: true
  }

  export type ReportActionItemAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportActionItem to aggregate.
     */
    where?: ReportActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportActionItems to fetch.
     */
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportActionItems
    **/
    _count?: true | ReportActionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportActionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportActionItemMaxAggregateInputType
  }

  export type GetReportActionItemAggregateType<T extends ReportActionItemAggregateArgs> = {
        [P in keyof T & keyof AggregateReportActionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportActionItem[P]>
      : GetScalarType<T[P], AggregateReportActionItem[P]>
  }




  export type ReportActionItemGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportActionItemWhereInput
    orderBy?: Enumerable<ReportActionItemOrderByWithAggregationInput>
    by: ReportActionItemScalarFieldEnum[]
    having?: ReportActionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportActionItemCountAggregateInputType | true
    _min?: ReportActionItemMinAggregateInputType
    _max?: ReportActionItemMaxAggregateInputType
  }


  export type ReportActionItemGroupByOutputType = {
    id: string
    reportId: string
    description: string
    ownerId: string | null
    dueDate: Date | null
    done: boolean
    createdAt: Date
    _count: ReportActionItemCountAggregateOutputType | null
    _min: ReportActionItemMinAggregateOutputType | null
    _max: ReportActionItemMaxAggregateOutputType | null
  }

  type GetReportActionItemGroupByPayload<T extends ReportActionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ReportActionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportActionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportActionItemGroupByOutputType[P]>
            : GetScalarType<T[P], ReportActionItemGroupByOutputType[P]>
        }
      >
    >


  export type ReportActionItemSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    description?: boolean
    ownerId?: boolean
    dueDate?: boolean
    done?: boolean
    createdAt?: boolean
    report?: boolean | ReportArgs<ExtArgs>
    owner?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["reportActionItem"]>

  export type ReportActionItemSelectScalar = {
    id?: boolean
    reportId?: boolean
    description?: boolean
    ownerId?: boolean
    dueDate?: boolean
    done?: boolean
    createdAt?: boolean
  }

  export type ReportActionItemInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report?: boolean | ReportArgs<ExtArgs>
    owner?: boolean | UserArgs<ExtArgs>
  }


  type ReportActionItemGetPayload<S extends boolean | null | undefined | ReportActionItemArgs> = $Types.GetResult<ReportActionItemPayload, S>

  type ReportActionItemCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ReportActionItemFindManyArgs, 'select' | 'include'> & {
      select?: ReportActionItemCountAggregateInputType | true
    }

  export interface ReportActionItemDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportActionItem'], meta: { name: 'ReportActionItem' } }
    /**
     * Find zero or one ReportActionItem that matches the filter.
     * @param {ReportActionItemFindUniqueArgs} args - Arguments to find a ReportActionItem
     * @example
     * // Get one ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportActionItemFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportActionItemFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ReportActionItem'> extends True ? Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one ReportActionItem that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportActionItemFindUniqueOrThrowArgs} args - Arguments to find a ReportActionItem
     * @example
     * // Get one ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportActionItemFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportActionItemFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first ReportActionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemFindFirstArgs} args - Arguments to find a ReportActionItem
     * @example
     * // Get one ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportActionItemFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportActionItemFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ReportActionItem'> extends True ? Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first ReportActionItem that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemFindFirstOrThrowArgs} args - Arguments to find a ReportActionItem
     * @example
     * // Get one ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportActionItemFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportActionItemFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more ReportActionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportActionItems
     * const reportActionItems = await prisma.reportActionItem.findMany()
     * 
     * // Get first 10 ReportActionItems
     * const reportActionItems = await prisma.reportActionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportActionItemWithIdOnly = await prisma.reportActionItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReportActionItemFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportActionItemFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a ReportActionItem.
     * @param {ReportActionItemCreateArgs} args - Arguments to create a ReportActionItem.
     * @example
     * // Create one ReportActionItem
     * const ReportActionItem = await prisma.reportActionItem.create({
     *   data: {
     *     // ... data to create a ReportActionItem
     *   }
     * })
     * 
    **/
    create<T extends ReportActionItemCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportActionItemCreateArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many ReportActionItems.
     *     @param {ReportActionItemCreateManyArgs} args - Arguments to create many ReportActionItems.
     *     @example
     *     // Create many ReportActionItems
     *     const reportActionItem = await prisma.reportActionItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportActionItemCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportActionItemCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ReportActionItem.
     * @param {ReportActionItemDeleteArgs} args - Arguments to delete one ReportActionItem.
     * @example
     * // Delete one ReportActionItem
     * const ReportActionItem = await prisma.reportActionItem.delete({
     *   where: {
     *     // ... filter to delete one ReportActionItem
     *   }
     * })
     * 
    **/
    delete<T extends ReportActionItemDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReportActionItemDeleteArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one ReportActionItem.
     * @param {ReportActionItemUpdateArgs} args - Arguments to update one ReportActionItem.
     * @example
     * // Update one ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReportActionItemUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportActionItemUpdateArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more ReportActionItems.
     * @param {ReportActionItemDeleteManyArgs} args - Arguments to filter ReportActionItems to delete.
     * @example
     * // Delete a few ReportActionItems
     * const { count } = await prisma.reportActionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportActionItemDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportActionItemDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportActionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportActionItems
     * const reportActionItem = await prisma.reportActionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReportActionItemUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReportActionItemUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReportActionItem.
     * @param {ReportActionItemUpsertArgs} args - Arguments to update or create a ReportActionItem.
     * @example
     * // Update or create a ReportActionItem
     * const reportActionItem = await prisma.reportActionItem.upsert({
     *   create: {
     *     // ... data to create a ReportActionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportActionItem we want to update
     *   }
     * })
    **/
    upsert<T extends ReportActionItemUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReportActionItemUpsertArgs<ExtArgs>>
    ): Prisma__ReportActionItemClient<$Types.GetResult<ReportActionItemPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of ReportActionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemCountArgs} args - Arguments to filter ReportActionItems to count.
     * @example
     * // Count the number of ReportActionItems
     * const count = await prisma.reportActionItem.count({
     *   where: {
     *     // ... the filter for the ReportActionItems we want to count
     *   }
     * })
    **/
    count<T extends ReportActionItemCountArgs>(
      args?: Subset<T, ReportActionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportActionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportActionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportActionItemAggregateArgs>(args: Subset<T, ReportActionItemAggregateArgs>): Prisma.PrismaPromise<GetReportActionItemAggregateType<T>>

    /**
     * Group by ReportActionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportActionItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportActionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportActionItemGroupByArgs['orderBy'] }
        : { orderBy?: ReportActionItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportActionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportActionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportActionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportActionItemClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    report<T extends ReportArgs<ExtArgs> = {}>(args?: Subset<T, ReportArgs<ExtArgs>>): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    owner<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ReportActionItem base type for findUnique actions
   */
  export type ReportActionItemFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ReportActionItem to fetch.
     */
    where: ReportActionItemWhereUniqueInput
  }

  /**
   * ReportActionItem findUnique
   */
  export interface ReportActionItemFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportActionItemFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ReportActionItem findUniqueOrThrow
   */
  export type ReportActionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ReportActionItem to fetch.
     */
    where: ReportActionItemWhereUniqueInput
  }


  /**
   * ReportActionItem base type for findFirst actions
   */
  export type ReportActionItemFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ReportActionItem to fetch.
     */
    where?: ReportActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportActionItems to fetch.
     */
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportActionItems.
     */
    cursor?: ReportActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportActionItems.
     */
    distinct?: Enumerable<ReportActionItemScalarFieldEnum>
  }

  /**
   * ReportActionItem findFirst
   */
  export interface ReportActionItemFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportActionItemFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ReportActionItem findFirstOrThrow
   */
  export type ReportActionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ReportActionItem to fetch.
     */
    where?: ReportActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportActionItems to fetch.
     */
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportActionItems.
     */
    cursor?: ReportActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportActionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportActionItems.
     */
    distinct?: Enumerable<ReportActionItemScalarFieldEnum>
  }


  /**
   * ReportActionItem findMany
   */
  export type ReportActionItemFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter, which ReportActionItems to fetch.
     */
    where?: ReportActionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportActionItems to fetch.
     */
    orderBy?: Enumerable<ReportActionItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportActionItems.
     */
    cursor?: ReportActionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportActionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportActionItems.
     */
    skip?: number
    distinct?: Enumerable<ReportActionItemScalarFieldEnum>
  }


  /**
   * ReportActionItem create
   */
  export type ReportActionItemCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ReportActionItem.
     */
    data: XOR<ReportActionItemCreateInput, ReportActionItemUncheckedCreateInput>
  }


  /**
   * ReportActionItem createMany
   */
  export type ReportActionItemCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportActionItems.
     */
    data: Enumerable<ReportActionItemCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ReportActionItem update
   */
  export type ReportActionItemUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ReportActionItem.
     */
    data: XOR<ReportActionItemUpdateInput, ReportActionItemUncheckedUpdateInput>
    /**
     * Choose, which ReportActionItem to update.
     */
    where: ReportActionItemWhereUniqueInput
  }


  /**
   * ReportActionItem updateMany
   */
  export type ReportActionItemUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportActionItems.
     */
    data: XOR<ReportActionItemUpdateManyMutationInput, ReportActionItemUncheckedUpdateManyInput>
    /**
     * Filter which ReportActionItems to update
     */
    where?: ReportActionItemWhereInput
  }


  /**
   * ReportActionItem upsert
   */
  export type ReportActionItemUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ReportActionItem to update in case it exists.
     */
    where: ReportActionItemWhereUniqueInput
    /**
     * In case the ReportActionItem found by the `where` argument doesn't exist, create a new ReportActionItem with this data.
     */
    create: XOR<ReportActionItemCreateInput, ReportActionItemUncheckedCreateInput>
    /**
     * In case the ReportActionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportActionItemUpdateInput, ReportActionItemUncheckedUpdateInput>
  }


  /**
   * ReportActionItem delete
   */
  export type ReportActionItemDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
    /**
     * Filter which ReportActionItem to delete.
     */
    where: ReportActionItemWhereUniqueInput
  }


  /**
   * ReportActionItem deleteMany
   */
  export type ReportActionItemDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportActionItems to delete
     */
    where?: ReportActionItemWhereInput
  }


  /**
   * ReportActionItem without action
   */
  export type ReportActionItemArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportActionItem
     */
    select?: ReportActionItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportActionItemInclude<ExtArgs> | null
  }



  /**
   * Model Attachment
   */


  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: string | null
    filename: string | null
    url: string | null
    meetingId: string | null
    reportId: string | null
    uploadedById: string | null
    createdAt: Date | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    url: string | null
    meetingId: string | null
    reportId: string | null
    uploadedById: string | null
    createdAt: Date | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    filename: number
    url: number
    meetingId: number
    reportId: number
    uploadedById: number
    createdAt: number
    _all: number
  }


  export type AttachmentMinAggregateInputType = {
    id?: true
    filename?: true
    url?: true
    meetingId?: true
    reportId?: true
    uploadedById?: true
    createdAt?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    filename?: true
    url?: true
    meetingId?: true
    reportId?: true
    uploadedById?: true
    createdAt?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    filename?: true
    url?: true
    meetingId?: true
    reportId?: true
    uploadedById?: true
    createdAt?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: Enumerable<AttachmentOrderByWithAggregationInput>
    by: AttachmentScalarFieldEnum[]
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }


  export type AttachmentGroupByOutputType = {
    id: string
    filename: string
    url: string
    meetingId: string | null
    reportId: string | null
    uploadedById: string | null
    createdAt: Date
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    url?: boolean
    meetingId?: boolean
    reportId?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    meeting?: boolean | MeetingArgs<ExtArgs>
    report?: boolean | ReportArgs<ExtArgs>
    uploadedBy?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    filename?: boolean
    url?: boolean
    meetingId?: boolean
    reportId?: boolean
    uploadedById?: boolean
    createdAt?: boolean
  }

  export type AttachmentInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meeting?: boolean | MeetingArgs<ExtArgs>
    report?: boolean | ReportArgs<ExtArgs>
    uploadedBy?: boolean | UserArgs<ExtArgs>
  }


  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentArgs> = $Types.GetResult<AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AttachmentFindManyArgs, 'select' | 'include'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AttachmentFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Attachment'> extends True ? Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Attachment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AttachmentFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Attachment'> extends True ? Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Attachment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AttachmentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
    **/
    create<T extends AttachmentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Attachments.
     *     @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     *     @example
     *     // Create many Attachments
     *     const attachment = await prisma.attachment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AttachmentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
    **/
    delete<T extends AttachmentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AttachmentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AttachmentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AttachmentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
    **/
    upsert<T extends AttachmentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>
    ): Prisma__AttachmentClient<$Types.GetResult<AttachmentPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    meeting<T extends MeetingArgs<ExtArgs> = {}>(args?: Subset<T, MeetingArgs<ExtArgs>>): Prisma__MeetingClient<$Types.GetResult<MeetingPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    report<T extends ReportArgs<ExtArgs> = {}>(args?: Subset<T, ReportArgs<ExtArgs>>): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    uploadedBy<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Attachment base type for findUnique actions
   */
  export type AttachmentFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUnique
   */
  export interface AttachmentFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AttachmentFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }


  /**
   * Attachment base type for findFirst actions
   */
  export type AttachmentFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }

  /**
   * Attachment findFirst
   */
  export interface AttachmentFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AttachmentFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }


  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: Enumerable<AttachmentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    distinct?: Enumerable<AttachmentScalarFieldEnum>
  }


  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }


  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: Enumerable<AttachmentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }


  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
  }


  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }


  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }


  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
  }


  /**
   * Attachment without action
   */
  export type AttachmentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AttachmentInclude<ExtArgs> | null
  }



  /**
   * Model AuditLog
   */


  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    model: string | null
    modelId: string | null
    action: string | null
    actorId: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    model: string | null
    modelId: string | null
    action: string | null
    actorId: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    model: number
    modelId: number
    action: number
    actorId: number
    timestamp: number
    diff: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    model?: true
    modelId?: true
    action?: true
    actorId?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    model?: true
    modelId?: true
    action?: true
    actorId?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    model?: true
    modelId?: true
    action?: true
    actorId?: true
    timestamp?: true
    diff?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Enumerable<AuditLogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: Enumerable<AuditLogOrderByWithAggregationInput>
    by: AuditLogScalarFieldEnum[]
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }


  export type AuditLogGroupByOutputType = {
    id: string
    model: string
    modelId: string
    action: string
    actorId: string | null
    timestamp: Date
    diff: JsonValue | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    model?: boolean
    modelId?: boolean
    action?: boolean
    actorId?: boolean
    timestamp?: boolean
    diff?: boolean
    actor?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    model?: boolean
    modelId?: boolean
    action?: boolean
    actorId?: boolean
    timestamp?: boolean
    diff?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    actor?: boolean | UserArgs<ExtArgs>
  }


  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogArgs> = $Types.GetResult<AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuditLogFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuditLog'> extends True ? Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuditLogFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuditLog'> extends True ? Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AuditLogFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
    **/
    create<T extends AuditLogCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many AuditLogs.
     *     @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     *     @example
     *     // Create many AuditLogs
     *     const auditLog = await prisma.auditLog.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuditLogCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
    **/
    delete<T extends AuditLogDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuditLogUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuditLogDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuditLogUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
    **/
    upsert<T extends AuditLogUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>
    ): Prisma__AuditLogClient<$Types.GetResult<AuditLogPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    actor<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AuditLog base type for findUnique actions
   */
  export type AuditLogFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUnique
   */
  export interface AuditLogFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AuditLogFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }


  /**
   * AuditLog base type for findFirst actions
   */
  export type AuditLogFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Enumerable<AuditLogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: Enumerable<AuditLogScalarFieldEnum>
  }

  /**
   * AuditLog findFirst
   */
  export interface AuditLogFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AuditLogFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Enumerable<AuditLogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: Enumerable<AuditLogScalarFieldEnum>
  }


  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: Enumerable<AuditLogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: Enumerable<AuditLogScalarFieldEnum>
  }


  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }


  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: Enumerable<AuditLogCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }


  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }


  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }


  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }


  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }


  /**
   * AuditLog without action
   */
  export type AuditLogArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AuditLogInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    hashedPassword: 'hashedPassword',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MeetingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    date: 'date',
    startTime: 'startTime',
    endTime: 'endTime',
    location: 'location',
    agenda: 'agenda',
    status: 'status',
    organizerId: 'organizerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum]


  export const MeetingParticipantScalarFieldEnum: {
    id: 'id',
    meetingId: 'meetingId',
    userId: 'userId',
    status: 'status',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type MeetingParticipantScalarFieldEnum = (typeof MeetingParticipantScalarFieldEnum)[keyof typeof MeetingParticipantScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    meetingId: 'meetingId',
    userId: 'userId',
    channel: 'channel',
    scheduledAt: 'scheduledAt',
    sentAt: 'sentAt',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    meetingId: 'meetingId',
    title: 'title',
    summary: 'summary',
    content: 'content',
    status: 'status',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ReportActionItemScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    description: 'description',
    ownerId: 'ownerId',
    dueDate: 'dueDate',
    done: 'done',
    createdAt: 'createdAt'
  };

  export type ReportActionItemScalarFieldEnum = (typeof ReportActionItemScalarFieldEnum)[keyof typeof ReportActionItemScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    url: 'url',
    meetingId: 'meetingId',
    reportId: 'reportId',
    uploadedById: 'uploadedById',
    createdAt: 'createdAt'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    model: 'model',
    modelId: 'modelId',
    action: 'action',
    actorId: 'actorId',
    timestamp: 'timestamp',
    diff: 'diff'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    image?: StringNullableFilter | string | null
    hashedPassword?: StringNullableFilter | string | null
    role?: EnumRoleFilter | Role
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    meetings?: MeetingListRelationFilter
    participants?: MeetingParticipantListRelationFilter
    reports?: ReportListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    notifications?: NotificationListRelationFilter
    ownedActionItems?: ReportActionItemListRelationFilter
    uploadedAttachments?: AttachmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meetings?: MeetingOrderByRelationAggregateInput
    participants?: MeetingParticipantOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    ownedActionItems?: ReportActionItemOrderByRelationAggregateInput
    uploadedAttachments?: AttachmentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    hashedPassword?: StringNullableWithAggregatesFilter | string | null
    role?: EnumRoleWithAggregatesFilter | Role
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type MeetingWhereInput = {
    AND?: Enumerable<MeetingWhereInput>
    OR?: Enumerable<MeetingWhereInput>
    NOT?: Enumerable<MeetingWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    type?: StringNullableFilter | string | null
    date?: DateTimeFilter | Date | string
    startTime?: DateTimeNullableFilter | Date | string | null
    endTime?: DateTimeNullableFilter | Date | string | null
    location?: StringNullableFilter | string | null
    agenda?: StringNullableFilter | string | null
    status?: EnumMeetingStatusFilter | MeetingStatus
    organizerId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    organizer?: XOR<UserRelationFilter, UserWhereInput>
    participants?: MeetingParticipantListRelationFilter
    attachments?: AttachmentListRelationFilter
    report?: XOR<ReportRelationFilter, ReportWhereInput> | null
    notifications?: NotificationListRelationFilter
  }

  export type MeetingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    date?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    agenda?: SortOrderInput | SortOrder
    status?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizer?: UserOrderByWithRelationInput
    participants?: MeetingParticipantOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
    report?: ReportOrderByWithRelationInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type MeetingWhereUniqueInput = {
    id?: string
  }

  export type MeetingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    date?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    agenda?: SortOrderInput | SortOrder
    status?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MeetingCountOrderByAggregateInput
    _max?: MeetingMaxOrderByAggregateInput
    _min?: MeetingMinOrderByAggregateInput
  }

  export type MeetingScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MeetingScalarWhereWithAggregatesInput>
    OR?: Enumerable<MeetingScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MeetingScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    type?: StringNullableWithAggregatesFilter | string | null
    date?: DateTimeWithAggregatesFilter | Date | string
    startTime?: DateTimeNullableWithAggregatesFilter | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter | Date | string | null
    location?: StringNullableWithAggregatesFilter | string | null
    agenda?: StringNullableWithAggregatesFilter | string | null
    status?: EnumMeetingStatusWithAggregatesFilter | MeetingStatus
    organizerId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type MeetingParticipantWhereInput = {
    AND?: Enumerable<MeetingParticipantWhereInput>
    OR?: Enumerable<MeetingParticipantWhereInput>
    NOT?: Enumerable<MeetingParticipantWhereInput>
    id?: StringFilter | string
    meetingId?: StringFilter | string
    userId?: StringFilter | string
    status?: EnumParticipantStatusFilter | ParticipantStatus
    role?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    meeting?: XOR<MeetingRelationFilter, MeetingWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MeetingParticipantOrderByWithRelationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MeetingParticipantWhereUniqueInput = {
    id?: string
  }

  export type MeetingParticipantOrderByWithAggregationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MeetingParticipantCountOrderByAggregateInput
    _max?: MeetingParticipantMaxOrderByAggregateInput
    _min?: MeetingParticipantMinOrderByAggregateInput
  }

  export type MeetingParticipantScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MeetingParticipantScalarWhereWithAggregatesInput>
    OR?: Enumerable<MeetingParticipantScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MeetingParticipantScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    meetingId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    status?: EnumParticipantStatusWithAggregatesFilter | ParticipantStatus
    role?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type NotificationWhereInput = {
    AND?: Enumerable<NotificationWhereInput>
    OR?: Enumerable<NotificationWhereInput>
    NOT?: Enumerable<NotificationWhereInput>
    id?: StringFilter | string
    meetingId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    channel?: EnumNotificationChannelFilter | NotificationChannel
    scheduledAt?: DateTimeFilter | Date | string
    sentAt?: DateTimeNullableFilter | Date | string | null
    status?: EnumNotificationStatusFilter | NotificationStatus
    createdAt?: DateTimeFilter | Date | string
    meeting?: XOR<MeetingRelationFilter, MeetingWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    meetingId?: SortOrderInput | SortOrder
    userId?: SortOrder
    channel?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = {
    id?: string
  }

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    meetingId?: SortOrderInput | SortOrder
    userId?: SortOrder
    channel?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    OR?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NotificationScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    meetingId?: StringNullableWithAggregatesFilter | string | null
    userId?: StringWithAggregatesFilter | string
    channel?: EnumNotificationChannelWithAggregatesFilter | NotificationChannel
    scheduledAt?: DateTimeWithAggregatesFilter | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    status?: EnumNotificationStatusWithAggregatesFilter | NotificationStatus
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ReportWhereInput = {
    AND?: Enumerable<ReportWhereInput>
    OR?: Enumerable<ReportWhereInput>
    NOT?: Enumerable<ReportWhereInput>
    id?: StringFilter | string
    meetingId?: StringFilter | string
    title?: StringFilter | string
    summary?: StringNullableFilter | string | null
    content?: StringNullableFilter | string | null
    status?: EnumReportStatusFilter | ReportStatus
    authorId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    meeting?: XOR<MeetingRelationFilter, MeetingWhereInput>
    author?: XOR<UserRelationFilter, UserWhereInput>
    actionItems?: ReportActionItemListRelationFilter
    attachments?: AttachmentListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    status?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    actionItems?: ReportActionItemOrderByRelationAggregateInput
    attachments?: AttachmentOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = {
    id?: string
    meetingId?: string
  }

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    meetingId?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    status?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    meetingId?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    summary?: StringNullableWithAggregatesFilter | string | null
    content?: StringNullableWithAggregatesFilter | string | null
    status?: EnumReportStatusWithAggregatesFilter | ReportStatus
    authorId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ReportActionItemWhereInput = {
    AND?: Enumerable<ReportActionItemWhereInput>
    OR?: Enumerable<ReportActionItemWhereInput>
    NOT?: Enumerable<ReportActionItemWhereInput>
    id?: StringFilter | string
    reportId?: StringFilter | string
    description?: StringFilter | string
    ownerId?: StringNullableFilter | string | null
    dueDate?: DateTimeNullableFilter | Date | string | null
    done?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    report?: XOR<ReportRelationFilter, ReportWhereInput>
    owner?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type ReportActionItemOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    report?: ReportOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type ReportActionItemWhereUniqueInput = {
    id?: string
  }

  export type ReportActionItemOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    _count?: ReportActionItemCountOrderByAggregateInput
    _max?: ReportActionItemMaxOrderByAggregateInput
    _min?: ReportActionItemMinOrderByAggregateInput
  }

  export type ReportActionItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportActionItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportActionItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportActionItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    reportId?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    ownerId?: StringNullableWithAggregatesFilter | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    done?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type AttachmentWhereInput = {
    AND?: Enumerable<AttachmentWhereInput>
    OR?: Enumerable<AttachmentWhereInput>
    NOT?: Enumerable<AttachmentWhereInput>
    id?: StringFilter | string
    filename?: StringFilter | string
    url?: StringFilter | string
    meetingId?: StringNullableFilter | string | null
    reportId?: StringNullableFilter | string | null
    uploadedById?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    meeting?: XOR<MeetingRelationFilter, MeetingWhereInput> | null
    report?: XOR<ReportRelationFilter, ReportWhereInput> | null
    uploadedBy?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    meetingId?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    uploadedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    meeting?: MeetingOrderByWithRelationInput
    report?: ReportOrderByWithRelationInput
    uploadedBy?: UserOrderByWithRelationInput
  }

  export type AttachmentWhereUniqueInput = {
    id?: string
  }

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    meetingId?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    uploadedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AttachmentScalarWhereWithAggregatesInput>
    OR?: Enumerable<AttachmentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AttachmentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    filename?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    meetingId?: StringNullableWithAggregatesFilter | string | null
    reportId?: StringNullableWithAggregatesFilter | string | null
    uploadedById?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: Enumerable<AuditLogWhereInput>
    OR?: Enumerable<AuditLogWhereInput>
    NOT?: Enumerable<AuditLogWhereInput>
    id?: StringFilter | string
    model?: StringFilter | string
    modelId?: StringFilter | string
    action?: StringFilter | string
    actorId?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
    diff?: JsonNullableFilter
    actor?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    model?: SortOrder
    modelId?: SortOrder
    action?: SortOrder
    actorId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    diff?: SortOrderInput | SortOrder
    actor?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = {
    id?: string
  }

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    model?: SortOrder
    modelId?: SortOrder
    action?: SortOrder
    actorId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    diff?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuditLogScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuditLogScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuditLogScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    model?: StringWithAggregatesFilter | string
    modelId?: StringWithAggregatesFilter | string
    action?: StringWithAggregatesFilter | string
    actorId?: StringNullableWithAggregatesFilter | string | null
    timestamp?: DateTimeWithAggregatesFilter | Date | string
    diff?: JsonNullableWithAggregatesFilter
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingCreateInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutMeetingsInput
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentCreateNestedManyWithoutMeetingInput
    report?: ReportCreateNestedOneWithoutMeetingInput
    notifications?: NotificationCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMeetingInput
    report?: ReportUncheckedCreateNestedOneWithoutMeetingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutMeetingsNestedInput
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUpdateManyWithoutMeetingNestedInput
    report?: ReportUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMeetingNestedInput
    report?: ReportUncheckedUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantCreateInput = {
    id?: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutParticipantsInput
    user: UserCreateNestedOneWithoutParticipantsInput
  }

  export type MeetingParticipantUncheckedCreateInput = {
    id?: string
    meetingId: string
    userId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type MeetingParticipantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutParticipantsNestedInput
    user?: UserUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantCreateManyInput = {
    id?: string
    meetingId: string
    userId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type MeetingParticipantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
    meeting?: MeetingCreateNestedOneWithoutNotificationsInput
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    meetingId?: string | null
    userId: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneWithoutNotificationsNestedInput
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    meetingId?: string | null
    userId: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutReportInput
    author: UserCreateNestedOneWithoutReportsInput
    actionItems?: ReportActionItemCreateNestedManyWithoutReportInput
    attachments?: AttachmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    actionItems?: ReportActionItemUncheckedCreateNestedManyWithoutReportInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutReportNestedInput
    author?: UserUpdateOneRequiredWithoutReportsNestedInput
    actionItems?: ReportActionItemUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionItems?: ReportActionItemUncheckedUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemCreateInput = {
    id?: string
    description: string
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutActionItemsInput
    owner?: UserCreateNestedOneWithoutOwnedActionItemsInput
  }

  export type ReportActionItemUncheckedCreateInput = {
    id?: string
    reportId: string
    description: string
    ownerId?: string | null
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ReportActionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutActionItemsNestedInput
    owner?: UserUpdateOneWithoutOwnedActionItemsNestedInput
  }

  export type ReportActionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemCreateManyInput = {
    id?: string
    reportId: string
    description: string
    ownerId?: string | null
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ReportActionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateInput = {
    id?: string
    filename: string
    url: string
    createdAt?: Date | string
    meeting?: MeetingCreateNestedOneWithoutAttachmentsInput
    report?: ReportCreateNestedOneWithoutAttachmentsInput
    uploadedBy?: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    reportId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type AttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneWithoutAttachmentsNestedInput
    report?: ReportUpdateOneWithoutAttachmentsNestedInput
    uploadedBy?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentCreateManyInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    reportId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type AttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    model: string
    modelId: string
    action: string
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
    actor?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    model: string
    modelId: string
    action: string
    actorId?: string | null
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
    actor?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateManyInput = {
    id?: string
    model: string
    modelId: string
    action: string
    actorId?: string | null
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type MeetingListRelationFilter = {
    every?: MeetingWhereInput
    some?: MeetingWhereInput
    none?: MeetingWhereInput
  }

  export type MeetingParticipantListRelationFilter = {
    every?: MeetingParticipantWhereInput
    some?: MeetingParticipantWhereInput
    none?: MeetingParticipantWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type ReportActionItemListRelationFilter = {
    every?: ReportActionItemWhereInput
    some?: ReportActionItemWhereInput
    none?: ReportActionItemWhereInput
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MeetingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportActionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type EnumMeetingStatusFilter = {
    equals?: MeetingStatus
    in?: Enumerable<MeetingStatus>
    notIn?: Enumerable<MeetingStatus>
    not?: NestedEnumMeetingStatusFilter | MeetingStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReportRelationFilter = {
    is?: ReportWhereInput | null
    isNot?: ReportWhereInput | null
  }

  export type MeetingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    agenda?: SortOrder
    status?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    agenda?: SortOrder
    status?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MeetingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    agenda?: SortOrder
    status?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type EnumMeetingStatusWithAggregatesFilter = {
    equals?: MeetingStatus
    in?: Enumerable<MeetingStatus>
    notIn?: Enumerable<MeetingStatus>
    not?: NestedEnumMeetingStatusWithAggregatesFilter | MeetingStatus
    _count?: NestedIntFilter
    _min?: NestedEnumMeetingStatusFilter
    _max?: NestedEnumMeetingStatusFilter
  }

  export type EnumParticipantStatusFilter = {
    equals?: ParticipantStatus
    in?: Enumerable<ParticipantStatus>
    notIn?: Enumerable<ParticipantStatus>
    not?: NestedEnumParticipantStatusFilter | ParticipantStatus
  }

  export type MeetingRelationFilter = {
    is?: MeetingWhereInput | null
    isNot?: MeetingWhereInput | null
  }

  export type MeetingParticipantCountOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MeetingParticipantMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MeetingParticipantMinOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumParticipantStatusWithAggregatesFilter = {
    equals?: ParticipantStatus
    in?: Enumerable<ParticipantStatus>
    notIn?: Enumerable<ParticipantStatus>
    not?: NestedEnumParticipantStatusWithAggregatesFilter | ParticipantStatus
    _count?: NestedIntFilter
    _min?: NestedEnumParticipantStatusFilter
    _max?: NestedEnumParticipantStatusFilter
  }

  export type EnumNotificationChannelFilter = {
    equals?: NotificationChannel
    in?: Enumerable<NotificationChannel>
    notIn?: Enumerable<NotificationChannel>
    not?: NestedEnumNotificationChannelFilter | NotificationChannel
  }

  export type EnumNotificationStatusFilter = {
    equals?: NotificationStatus
    in?: Enumerable<NotificationStatus>
    notIn?: Enumerable<NotificationStatus>
    not?: NestedEnumNotificationStatusFilter | NotificationStatus
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    channel?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    channel?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    userId?: SortOrder
    channel?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationChannelWithAggregatesFilter = {
    equals?: NotificationChannel
    in?: Enumerable<NotificationChannel>
    notIn?: Enumerable<NotificationChannel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter | NotificationChannel
    _count?: NestedIntFilter
    _min?: NestedEnumNotificationChannelFilter
    _max?: NestedEnumNotificationChannelFilter
  }

  export type EnumNotificationStatusWithAggregatesFilter = {
    equals?: NotificationStatus
    in?: Enumerable<NotificationStatus>
    notIn?: Enumerable<NotificationStatus>
    not?: NestedEnumNotificationStatusWithAggregatesFilter | NotificationStatus
    _count?: NestedIntFilter
    _min?: NestedEnumNotificationStatusFilter
    _max?: NestedEnumNotificationStatusFilter
  }

  export type EnumReportStatusFilter = {
    equals?: ReportStatus
    in?: Enumerable<ReportStatus>
    notIn?: Enumerable<ReportStatus>
    not?: NestedEnumReportStatusFilter | ReportStatus
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    status?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    status?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    meetingId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    content?: SortOrder
    status?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter = {
    equals?: ReportStatus
    in?: Enumerable<ReportStatus>
    notIn?: Enumerable<ReportStatus>
    not?: NestedEnumReportStatusWithAggregatesFilter | ReportStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReportStatusFilter
    _max?: NestedEnumReportStatusFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type ReportActionItemCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    dueDate?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportActionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    dueDate?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type ReportActionItemMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    dueDate?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    meetingId?: SortOrder
    reportId?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    meetingId?: SortOrder
    reportId?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    url?: SortOrder
    meetingId?: SortOrder
    reportId?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    model?: SortOrder
    modelId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    timestamp?: SortOrder
    diff?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    model?: SortOrder
    modelId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    model?: SortOrder
    modelId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    timestamp?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type MeetingCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<Enumerable<MeetingCreateWithoutOrganizerInput>, Enumerable<MeetingUncheckedCreateWithoutOrganizerInput>>
    connectOrCreate?: Enumerable<MeetingCreateOrConnectWithoutOrganizerInput>
    createMany?: MeetingCreateManyOrganizerInputEnvelope
    connect?: Enumerable<MeetingWhereUniqueInput>
  }

  export type MeetingParticipantCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutUserInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutUserInput>
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
  }

  export type ReportCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<ReportCreateWithoutAuthorInput>, Enumerable<ReportUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutAuthorInput>
    createMany?: ReportCreateManyAuthorInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: XOR<Enumerable<AuditLogCreateWithoutActorInput>, Enumerable<AuditLogUncheckedCreateWithoutActorInput>>
    connectOrCreate?: Enumerable<AuditLogCreateOrConnectWithoutActorInput>
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: Enumerable<AuditLogWhereUniqueInput>
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type ReportActionItemCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutOwnerInput>, Enumerable<ReportActionItemUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutOwnerInput>
    createMany?: ReportActionItemCreateManyOwnerInputEnvelope
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
  }

  export type AttachmentCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutUploadedByInput>, Enumerable<AttachmentUncheckedCreateWithoutUploadedByInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutUploadedByInput>
    createMany?: AttachmentCreateManyUploadedByInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type MeetingUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<Enumerable<MeetingCreateWithoutOrganizerInput>, Enumerable<MeetingUncheckedCreateWithoutOrganizerInput>>
    connectOrCreate?: Enumerable<MeetingCreateOrConnectWithoutOrganizerInput>
    createMany?: MeetingCreateManyOrganizerInputEnvelope
    connect?: Enumerable<MeetingWhereUniqueInput>
  }

  export type MeetingParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutUserInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutUserInput>
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
  }

  export type ReportUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<ReportCreateWithoutAuthorInput>, Enumerable<ReportUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutAuthorInput>
    createMany?: ReportCreateManyAuthorInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<Enumerable<AuditLogCreateWithoutActorInput>, Enumerable<AuditLogUncheckedCreateWithoutActorInput>>
    connectOrCreate?: Enumerable<AuditLogCreateOrConnectWithoutActorInput>
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: Enumerable<AuditLogWhereUniqueInput>
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutOwnerInput>, Enumerable<ReportActionItemUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutOwnerInput>
    createMany?: ReportActionItemCreateManyOwnerInputEnvelope
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
  }

  export type AttachmentUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutUploadedByInput>, Enumerable<AttachmentUncheckedCreateWithoutUploadedByInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutUploadedByInput>
    createMany?: AttachmentCreateManyUploadedByInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MeetingUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<Enumerable<MeetingCreateWithoutOrganizerInput>, Enumerable<MeetingUncheckedCreateWithoutOrganizerInput>>
    connectOrCreate?: Enumerable<MeetingCreateOrConnectWithoutOrganizerInput>
    upsert?: Enumerable<MeetingUpsertWithWhereUniqueWithoutOrganizerInput>
    createMany?: MeetingCreateManyOrganizerInputEnvelope
    set?: Enumerable<MeetingWhereUniqueInput>
    disconnect?: Enumerable<MeetingWhereUniqueInput>
    delete?: Enumerable<MeetingWhereUniqueInput>
    connect?: Enumerable<MeetingWhereUniqueInput>
    update?: Enumerable<MeetingUpdateWithWhereUniqueWithoutOrganizerInput>
    updateMany?: Enumerable<MeetingUpdateManyWithWhereWithoutOrganizerInput>
    deleteMany?: Enumerable<MeetingScalarWhereInput>
  }

  export type MeetingParticipantUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutUserInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<MeetingParticipantUpsertWithWhereUniqueWithoutUserInput>
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    set?: Enumerable<MeetingParticipantWhereUniqueInput>
    disconnect?: Enumerable<MeetingParticipantWhereUniqueInput>
    delete?: Enumerable<MeetingParticipantWhereUniqueInput>
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
    update?: Enumerable<MeetingParticipantUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<MeetingParticipantUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<MeetingParticipantScalarWhereInput>
  }

  export type ReportUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<ReportCreateWithoutAuthorInput>, Enumerable<ReportUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<ReportUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: ReportCreateManyAuthorInputEnvelope
    set?: Enumerable<ReportWhereUniqueInput>
    disconnect?: Enumerable<ReportWhereUniqueInput>
    delete?: Enumerable<ReportWhereUniqueInput>
    connect?: Enumerable<ReportWhereUniqueInput>
    update?: Enumerable<ReportUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<ReportUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<ReportScalarWhereInput>
  }

  export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<Enumerable<AuditLogCreateWithoutActorInput>, Enumerable<AuditLogUncheckedCreateWithoutActorInput>>
    connectOrCreate?: Enumerable<AuditLogCreateOrConnectWithoutActorInput>
    upsert?: Enumerable<AuditLogUpsertWithWhereUniqueWithoutActorInput>
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: Enumerable<AuditLogWhereUniqueInput>
    disconnect?: Enumerable<AuditLogWhereUniqueInput>
    delete?: Enumerable<AuditLogWhereUniqueInput>
    connect?: Enumerable<AuditLogWhereUniqueInput>
    update?: Enumerable<AuditLogUpdateWithWhereUniqueWithoutActorInput>
    updateMany?: Enumerable<AuditLogUpdateManyWithWhereWithoutActorInput>
    deleteMany?: Enumerable<AuditLogScalarWhereInput>
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type ReportActionItemUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutOwnerInput>, Enumerable<ReportActionItemUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ReportActionItemUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ReportActionItemCreateManyOwnerInputEnvelope
    set?: Enumerable<ReportActionItemWhereUniqueInput>
    disconnect?: Enumerable<ReportActionItemWhereUniqueInput>
    delete?: Enumerable<ReportActionItemWhereUniqueInput>
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
    update?: Enumerable<ReportActionItemUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ReportActionItemUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ReportActionItemScalarWhereInput>
  }

  export type AttachmentUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutUploadedByInput>, Enumerable<AttachmentUncheckedCreateWithoutUploadedByInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutUploadedByInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutUploadedByInput>
    createMany?: AttachmentCreateManyUploadedByInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutUploadedByInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutUploadedByInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type MeetingUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<Enumerable<MeetingCreateWithoutOrganizerInput>, Enumerable<MeetingUncheckedCreateWithoutOrganizerInput>>
    connectOrCreate?: Enumerable<MeetingCreateOrConnectWithoutOrganizerInput>
    upsert?: Enumerable<MeetingUpsertWithWhereUniqueWithoutOrganizerInput>
    createMany?: MeetingCreateManyOrganizerInputEnvelope
    set?: Enumerable<MeetingWhereUniqueInput>
    disconnect?: Enumerable<MeetingWhereUniqueInput>
    delete?: Enumerable<MeetingWhereUniqueInput>
    connect?: Enumerable<MeetingWhereUniqueInput>
    update?: Enumerable<MeetingUpdateWithWhereUniqueWithoutOrganizerInput>
    updateMany?: Enumerable<MeetingUpdateManyWithWhereWithoutOrganizerInput>
    deleteMany?: Enumerable<MeetingScalarWhereInput>
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutUserInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<MeetingParticipantUpsertWithWhereUniqueWithoutUserInput>
    createMany?: MeetingParticipantCreateManyUserInputEnvelope
    set?: Enumerable<MeetingParticipantWhereUniqueInput>
    disconnect?: Enumerable<MeetingParticipantWhereUniqueInput>
    delete?: Enumerable<MeetingParticipantWhereUniqueInput>
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
    update?: Enumerable<MeetingParticipantUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<MeetingParticipantUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<MeetingParticipantScalarWhereInput>
  }

  export type ReportUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<ReportCreateWithoutAuthorInput>, Enumerable<ReportUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<ReportUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: ReportCreateManyAuthorInputEnvelope
    set?: Enumerable<ReportWhereUniqueInput>
    disconnect?: Enumerable<ReportWhereUniqueInput>
    delete?: Enumerable<ReportWhereUniqueInput>
    connect?: Enumerable<ReportWhereUniqueInput>
    update?: Enumerable<ReportUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<ReportUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<ReportScalarWhereInput>
  }

  export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<Enumerable<AuditLogCreateWithoutActorInput>, Enumerable<AuditLogUncheckedCreateWithoutActorInput>>
    connectOrCreate?: Enumerable<AuditLogCreateOrConnectWithoutActorInput>
    upsert?: Enumerable<AuditLogUpsertWithWhereUniqueWithoutActorInput>
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: Enumerable<AuditLogWhereUniqueInput>
    disconnect?: Enumerable<AuditLogWhereUniqueInput>
    delete?: Enumerable<AuditLogWhereUniqueInput>
    connect?: Enumerable<AuditLogWhereUniqueInput>
    update?: Enumerable<AuditLogUpdateWithWhereUniqueWithoutActorInput>
    updateMany?: Enumerable<AuditLogUpdateManyWithWhereWithoutActorInput>
    deleteMany?: Enumerable<AuditLogScalarWhereInput>
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutUserInput>, Enumerable<NotificationUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutUserInput>
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutOwnerInput>, Enumerable<ReportActionItemUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ReportActionItemUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ReportActionItemCreateManyOwnerInputEnvelope
    set?: Enumerable<ReportActionItemWhereUniqueInput>
    disconnect?: Enumerable<ReportActionItemWhereUniqueInput>
    delete?: Enumerable<ReportActionItemWhereUniqueInput>
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
    update?: Enumerable<ReportActionItemUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ReportActionItemUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ReportActionItemScalarWhereInput>
  }

  export type AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutUploadedByInput>, Enumerable<AttachmentUncheckedCreateWithoutUploadedByInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutUploadedByInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutUploadedByInput>
    createMany?: AttachmentCreateManyUploadedByInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutUploadedByInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutUploadedByInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutMeetingsInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput
    connect?: UserWhereUniqueInput
  }

  export type MeetingParticipantCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutMeetingInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutMeetingInput>
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
  }

  export type AttachmentCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutMeetingInput>, Enumerable<AttachmentUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutMeetingInput>
    createMany?: AttachmentCreateManyMeetingInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type ReportCreateNestedOneWithoutMeetingInput = {
    create?: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMeetingInput
    connect?: ReportWhereUniqueInput
  }

  export type NotificationCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutMeetingInput>, Enumerable<NotificationUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutMeetingInput>
    createMany?: NotificationCreateManyMeetingInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutMeetingInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutMeetingInput>
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
  }

  export type AttachmentUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutMeetingInput>, Enumerable<AttachmentUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutMeetingInput>
    createMany?: AttachmentCreateManyMeetingInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type ReportUncheckedCreateNestedOneWithoutMeetingInput = {
    create?: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMeetingInput
    connect?: ReportWhereUniqueInput
  }

  export type NotificationUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutMeetingInput>, Enumerable<NotificationUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutMeetingInput>
    createMany?: NotificationCreateManyMeetingInputEnvelope
    connect?: Enumerable<NotificationWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumMeetingStatusFieldUpdateOperationsInput = {
    set?: MeetingStatus
  }

  export type UserUpdateOneRequiredWithoutMeetingsNestedInput = {
    create?: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeetingsInput
    upsert?: UserUpsertWithoutMeetingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
  }

  export type MeetingParticipantUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutMeetingInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    set?: Enumerable<MeetingParticipantWhereUniqueInput>
    disconnect?: Enumerable<MeetingParticipantWhereUniqueInput>
    delete?: Enumerable<MeetingParticipantWhereUniqueInput>
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
    update?: Enumerable<MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<MeetingParticipantUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<MeetingParticipantScalarWhereInput>
  }

  export type AttachmentUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutMeetingInput>, Enumerable<AttachmentUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: AttachmentCreateManyMeetingInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type ReportUpdateOneWithoutMeetingNestedInput = {
    create?: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMeetingInput
    upsert?: ReportUpsertWithoutMeetingInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<ReportUpdateWithoutMeetingInput, ReportUncheckedUpdateWithoutMeetingInput>
  }

  export type NotificationUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutMeetingInput>, Enumerable<NotificationUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: NotificationCreateManyMeetingInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<MeetingParticipantCreateWithoutMeetingInput>, Enumerable<MeetingParticipantUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<MeetingParticipantCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: MeetingParticipantCreateManyMeetingInputEnvelope
    set?: Enumerable<MeetingParticipantWhereUniqueInput>
    disconnect?: Enumerable<MeetingParticipantWhereUniqueInput>
    delete?: Enumerable<MeetingParticipantWhereUniqueInput>
    connect?: Enumerable<MeetingParticipantWhereUniqueInput>
    update?: Enumerable<MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<MeetingParticipantUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<MeetingParticipantScalarWhereInput>
  }

  export type AttachmentUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutMeetingInput>, Enumerable<AttachmentUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: AttachmentCreateManyMeetingInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type ReportUncheckedUpdateOneWithoutMeetingNestedInput = {
    create?: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMeetingInput
    upsert?: ReportUpsertWithoutMeetingInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<ReportUpdateWithoutMeetingInput, ReportUncheckedUpdateWithoutMeetingInput>
  }

  export type NotificationUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: XOR<Enumerable<NotificationCreateWithoutMeetingInput>, Enumerable<NotificationUncheckedCreateWithoutMeetingInput>>
    connectOrCreate?: Enumerable<NotificationCreateOrConnectWithoutMeetingInput>
    upsert?: Enumerable<NotificationUpsertWithWhereUniqueWithoutMeetingInput>
    createMany?: NotificationCreateManyMeetingInputEnvelope
    set?: Enumerable<NotificationWhereUniqueInput>
    disconnect?: Enumerable<NotificationWhereUniqueInput>
    delete?: Enumerable<NotificationWhereUniqueInput>
    connect?: Enumerable<NotificationWhereUniqueInput>
    update?: Enumerable<NotificationUpdateWithWhereUniqueWithoutMeetingInput>
    updateMany?: Enumerable<NotificationUpdateManyWithWhereWithoutMeetingInput>
    deleteMany?: Enumerable<NotificationScalarWhereInput>
  }

  export type MeetingCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutParticipantsInput
    connect?: MeetingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<UserCreateWithoutParticipantsInput, UserUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipantsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumParticipantStatusFieldUpdateOperationsInput = {
    set?: ParticipantStatus
  }

  export type MeetingUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutParticipantsInput
    upsert?: MeetingUpsertWithoutParticipantsInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<MeetingUpdateWithoutParticipantsInput, MeetingUncheckedUpdateWithoutParticipantsInput>
  }

  export type UserUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<UserCreateWithoutParticipantsInput, UserUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipantsInput
    upsert?: UserUpsertWithoutParticipantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutParticipantsInput, UserUncheckedUpdateWithoutParticipantsInput>
  }

  export type MeetingCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<MeetingCreateWithoutNotificationsInput, MeetingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutNotificationsInput
    connect?: MeetingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: NotificationChannel
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: NotificationStatus
  }

  export type MeetingUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<MeetingCreateWithoutNotificationsInput, MeetingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutNotificationsInput
    upsert?: MeetingUpsertWithoutNotificationsInput
    disconnect?: boolean
    delete?: boolean
    connect?: MeetingWhereUniqueInput
    update?: XOR<MeetingUpdateWithoutNotificationsInput, MeetingUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type MeetingCreateNestedOneWithoutReportInput = {
    create?: XOR<MeetingCreateWithoutReportInput, MeetingUncheckedCreateWithoutReportInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutReportInput
    connect?: MeetingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportActionItemCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutReportInput>, Enumerable<ReportActionItemUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutReportInput>
    createMany?: ReportActionItemCreateManyReportInputEnvelope
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
  }

  export type AttachmentCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutReportInput>, Enumerable<AttachmentUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutReportInput>
    createMany?: AttachmentCreateManyReportInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type ReportActionItemUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutReportInput>, Enumerable<ReportActionItemUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutReportInput>
    createMany?: ReportActionItemCreateManyReportInputEnvelope
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
  }

  export type AttachmentUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutReportInput>, Enumerable<AttachmentUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutReportInput>
    createMany?: AttachmentCreateManyReportInputEnvelope
    connect?: Enumerable<AttachmentWhereUniqueInput>
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: ReportStatus
  }

  export type MeetingUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<MeetingCreateWithoutReportInput, MeetingUncheckedCreateWithoutReportInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutReportInput
    upsert?: MeetingUpsertWithoutReportInput
    connect?: MeetingWhereUniqueInput
    update?: XOR<MeetingUpdateWithoutReportInput, MeetingUncheckedUpdateWithoutReportInput>
  }

  export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type ReportActionItemUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutReportInput>, Enumerable<ReportActionItemUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<ReportActionItemUpsertWithWhereUniqueWithoutReportInput>
    createMany?: ReportActionItemCreateManyReportInputEnvelope
    set?: Enumerable<ReportActionItemWhereUniqueInput>
    disconnect?: Enumerable<ReportActionItemWhereUniqueInput>
    delete?: Enumerable<ReportActionItemWhereUniqueInput>
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
    update?: Enumerable<ReportActionItemUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<ReportActionItemUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<ReportActionItemScalarWhereInput>
  }

  export type AttachmentUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutReportInput>, Enumerable<AttachmentUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutReportInput>
    createMany?: AttachmentCreateManyReportInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type ReportActionItemUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<ReportActionItemCreateWithoutReportInput>, Enumerable<ReportActionItemUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportActionItemCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<ReportActionItemUpsertWithWhereUniqueWithoutReportInput>
    createMany?: ReportActionItemCreateManyReportInputEnvelope
    set?: Enumerable<ReportActionItemWhereUniqueInput>
    disconnect?: Enumerable<ReportActionItemWhereUniqueInput>
    delete?: Enumerable<ReportActionItemWhereUniqueInput>
    connect?: Enumerable<ReportActionItemWhereUniqueInput>
    update?: Enumerable<ReportActionItemUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<ReportActionItemUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<ReportActionItemScalarWhereInput>
  }

  export type AttachmentUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<AttachmentCreateWithoutReportInput>, Enumerable<AttachmentUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<AttachmentCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<AttachmentUpsertWithWhereUniqueWithoutReportInput>
    createMany?: AttachmentCreateManyReportInputEnvelope
    set?: Enumerable<AttachmentWhereUniqueInput>
    disconnect?: Enumerable<AttachmentWhereUniqueInput>
    delete?: Enumerable<AttachmentWhereUniqueInput>
    connect?: Enumerable<AttachmentWhereUniqueInput>
    update?: Enumerable<AttachmentUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<AttachmentUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<AttachmentScalarWhereInput>
  }

  export type ReportCreateNestedOneWithoutActionItemsInput = {
    create?: XOR<ReportCreateWithoutActionItemsInput, ReportUncheckedCreateWithoutActionItemsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutActionItemsInput
    connect?: ReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOwnedActionItemsInput = {
    create?: XOR<UserCreateWithoutOwnedActionItemsInput, UserUncheckedCreateWithoutOwnedActionItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedActionItemsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ReportUpdateOneRequiredWithoutActionItemsNestedInput = {
    create?: XOR<ReportCreateWithoutActionItemsInput, ReportUncheckedCreateWithoutActionItemsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutActionItemsInput
    upsert?: ReportUpsertWithoutActionItemsInput
    connect?: ReportWhereUniqueInput
    update?: XOR<ReportUpdateWithoutActionItemsInput, ReportUncheckedUpdateWithoutActionItemsInput>
  }

  export type UserUpdateOneWithoutOwnedActionItemsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedActionItemsInput, UserUncheckedCreateWithoutOwnedActionItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedActionItemsInput
    upsert?: UserUpsertWithoutOwnedActionItemsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutOwnedActionItemsInput, UserUncheckedUpdateWithoutOwnedActionItemsInput>
  }

  export type MeetingCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<MeetingCreateWithoutAttachmentsInput, MeetingUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutAttachmentsInput
    connect?: MeetingWhereUniqueInput
  }

  export type ReportCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<ReportCreateWithoutAttachmentsInput, ReportUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAttachmentsInput
    connect?: ReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUploadedAttachmentsInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    connect?: UserWhereUniqueInput
  }

  export type MeetingUpdateOneWithoutAttachmentsNestedInput = {
    create?: XOR<MeetingCreateWithoutAttachmentsInput, MeetingUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MeetingCreateOrConnectWithoutAttachmentsInput
    upsert?: MeetingUpsertWithoutAttachmentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: MeetingWhereUniqueInput
    update?: XOR<MeetingUpdateWithoutAttachmentsInput, MeetingUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ReportUpdateOneWithoutAttachmentsNestedInput = {
    create?: XOR<ReportCreateWithoutAttachmentsInput, ReportUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAttachmentsInput
    upsert?: ReportUpsertWithoutAttachmentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<ReportUpdateWithoutAttachmentsInput, ReportUncheckedUpdateWithoutAttachmentsInput>
  }

  export type UserUpdateOneWithoutUploadedAttachmentsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedAttachmentsInput
    upsert?: UserUpsertWithoutUploadedAttachmentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedEnumMeetingStatusFilter = {
    equals?: MeetingStatus
    in?: Enumerable<MeetingStatus>
    notIn?: Enumerable<MeetingStatus>
    not?: NestedEnumMeetingStatusFilter | MeetingStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedEnumMeetingStatusWithAggregatesFilter = {
    equals?: MeetingStatus
    in?: Enumerable<MeetingStatus>
    notIn?: Enumerable<MeetingStatus>
    not?: NestedEnumMeetingStatusWithAggregatesFilter | MeetingStatus
    _count?: NestedIntFilter
    _min?: NestedEnumMeetingStatusFilter
    _max?: NestedEnumMeetingStatusFilter
  }

  export type NestedEnumParticipantStatusFilter = {
    equals?: ParticipantStatus
    in?: Enumerable<ParticipantStatus>
    notIn?: Enumerable<ParticipantStatus>
    not?: NestedEnumParticipantStatusFilter | ParticipantStatus
  }

  export type NestedEnumParticipantStatusWithAggregatesFilter = {
    equals?: ParticipantStatus
    in?: Enumerable<ParticipantStatus>
    notIn?: Enumerable<ParticipantStatus>
    not?: NestedEnumParticipantStatusWithAggregatesFilter | ParticipantStatus
    _count?: NestedIntFilter
    _min?: NestedEnumParticipantStatusFilter
    _max?: NestedEnumParticipantStatusFilter
  }

  export type NestedEnumNotificationChannelFilter = {
    equals?: NotificationChannel
    in?: Enumerable<NotificationChannel>
    notIn?: Enumerable<NotificationChannel>
    not?: NestedEnumNotificationChannelFilter | NotificationChannel
  }

  export type NestedEnumNotificationStatusFilter = {
    equals?: NotificationStatus
    in?: Enumerable<NotificationStatus>
    notIn?: Enumerable<NotificationStatus>
    not?: NestedEnumNotificationStatusFilter | NotificationStatus
  }

  export type NestedEnumNotificationChannelWithAggregatesFilter = {
    equals?: NotificationChannel
    in?: Enumerable<NotificationChannel>
    notIn?: Enumerable<NotificationChannel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter | NotificationChannel
    _count?: NestedIntFilter
    _min?: NestedEnumNotificationChannelFilter
    _max?: NestedEnumNotificationChannelFilter
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter = {
    equals?: NotificationStatus
    in?: Enumerable<NotificationStatus>
    notIn?: Enumerable<NotificationStatus>
    not?: NestedEnumNotificationStatusWithAggregatesFilter | NotificationStatus
    _count?: NestedIntFilter
    _min?: NestedEnumNotificationStatusFilter
    _max?: NestedEnumNotificationStatusFilter
  }

  export type NestedEnumReportStatusFilter = {
    equals?: ReportStatus
    in?: Enumerable<ReportStatus>
    notIn?: Enumerable<ReportStatus>
    not?: NestedEnumReportStatusFilter | ReportStatus
  }

  export type NestedEnumReportStatusWithAggregatesFilter = {
    equals?: ReportStatus
    in?: Enumerable<ReportStatus>
    notIn?: Enumerable<ReportStatus>
    not?: NestedEnumReportStatusWithAggregatesFilter | ReportStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReportStatusFilter
    _max?: NestedEnumReportStatusFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type MeetingCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentCreateNestedManyWithoutMeetingInput
    report?: ReportCreateNestedOneWithoutMeetingInput
    notifications?: NotificationCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMeetingInput
    report?: ReportUncheckedCreateNestedOneWithoutMeetingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutOrganizerInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutOrganizerInput, MeetingUncheckedCreateWithoutOrganizerInput>
  }

  export type MeetingCreateManyOrganizerInputEnvelope = {
    data: Enumerable<MeetingCreateManyOrganizerInput>
    skipDuplicates?: boolean
  }

  export type MeetingParticipantCreateWithoutUserInput = {
    id?: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutParticipantsInput
  }

  export type MeetingParticipantUncheckedCreateWithoutUserInput = {
    id?: string
    meetingId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type MeetingParticipantCreateOrConnectWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    create: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput>
  }

  export type MeetingParticipantCreateManyUserInputEnvelope = {
    data: Enumerable<MeetingParticipantCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutAuthorInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutReportInput
    actionItems?: ReportActionItemCreateNestedManyWithoutReportInput
    attachments?: AttachmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutAuthorInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    actionItems?: ReportActionItemUncheckedCreateNestedManyWithoutReportInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutAuthorInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAuthorInput, ReportUncheckedCreateWithoutAuthorInput>
  }

  export type ReportCreateManyAuthorInputEnvelope = {
    data: Enumerable<ReportCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutActorInput = {
    id?: string
    model: string
    modelId: string
    action: string
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: string
    model: string
    modelId: string
    action: string
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateOrConnectWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogCreateManyActorInputEnvelope = {
    data: Enumerable<AuditLogCreateManyActorInput>
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
    meeting?: MeetingCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    meetingId?: string | null
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: Enumerable<NotificationCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ReportActionItemCreateWithoutOwnerInput = {
    id?: string
    description: string
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutActionItemsInput
  }

  export type ReportActionItemUncheckedCreateWithoutOwnerInput = {
    id?: string
    reportId: string
    description: string
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ReportActionItemCreateOrConnectWithoutOwnerInput = {
    where: ReportActionItemWhereUniqueInput
    create: XOR<ReportActionItemCreateWithoutOwnerInput, ReportActionItemUncheckedCreateWithoutOwnerInput>
  }

  export type ReportActionItemCreateManyOwnerInputEnvelope = {
    data: Enumerable<ReportActionItemCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutUploadedByInput = {
    id?: string
    filename: string
    url: string
    createdAt?: Date | string
    meeting?: MeetingCreateNestedOneWithoutAttachmentsInput
    report?: ReportCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutUploadedByInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    reportId?: string | null
    createdAt?: Date | string
  }

  export type AttachmentCreateOrConnectWithoutUploadedByInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutUploadedByInput, AttachmentUncheckedCreateWithoutUploadedByInput>
  }

  export type AttachmentCreateManyUploadedByInputEnvelope = {
    data: Enumerable<AttachmentCreateManyUploadedByInput>
    skipDuplicates?: boolean
  }

  export type MeetingUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: MeetingWhereUniqueInput
    update: XOR<MeetingUpdateWithoutOrganizerInput, MeetingUncheckedUpdateWithoutOrganizerInput>
    create: XOR<MeetingCreateWithoutOrganizerInput, MeetingUncheckedCreateWithoutOrganizerInput>
  }

  export type MeetingUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: MeetingWhereUniqueInput
    data: XOR<MeetingUpdateWithoutOrganizerInput, MeetingUncheckedUpdateWithoutOrganizerInput>
  }

  export type MeetingUpdateManyWithWhereWithoutOrganizerInput = {
    where: MeetingScalarWhereInput
    data: XOR<MeetingUpdateManyMutationInput, MeetingUncheckedUpdateManyWithoutMeetingsInput>
  }

  export type MeetingScalarWhereInput = {
    AND?: Enumerable<MeetingScalarWhereInput>
    OR?: Enumerable<MeetingScalarWhereInput>
    NOT?: Enumerable<MeetingScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    type?: StringNullableFilter | string | null
    date?: DateTimeFilter | Date | string
    startTime?: DateTimeNullableFilter | Date | string | null
    endTime?: DateTimeNullableFilter | Date | string | null
    location?: StringNullableFilter | string | null
    agenda?: StringNullableFilter | string | null
    status?: EnumMeetingStatusFilter | MeetingStatus
    organizerId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type MeetingParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    update: XOR<MeetingParticipantUpdateWithoutUserInput, MeetingParticipantUncheckedUpdateWithoutUserInput>
    create: XOR<MeetingParticipantCreateWithoutUserInput, MeetingParticipantUncheckedCreateWithoutUserInput>
  }

  export type MeetingParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: MeetingParticipantWhereUniqueInput
    data: XOR<MeetingParticipantUpdateWithoutUserInput, MeetingParticipantUncheckedUpdateWithoutUserInput>
  }

  export type MeetingParticipantUpdateManyWithWhereWithoutUserInput = {
    where: MeetingParticipantScalarWhereInput
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyWithoutParticipantsInput>
  }

  export type MeetingParticipantScalarWhereInput = {
    AND?: Enumerable<MeetingParticipantScalarWhereInput>
    OR?: Enumerable<MeetingParticipantScalarWhereInput>
    NOT?: Enumerable<MeetingParticipantScalarWhereInput>
    id?: StringFilter | string
    meetingId?: StringFilter | string
    userId?: StringFilter | string
    status?: EnumParticipantStatusFilter | ParticipantStatus
    role?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutAuthorInput, ReportUncheckedUpdateWithoutAuthorInput>
    create: XOR<ReportCreateWithoutAuthorInput, ReportUncheckedCreateWithoutAuthorInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutAuthorInput, ReportUncheckedUpdateWithoutAuthorInput>
  }

  export type ReportUpdateManyWithWhereWithoutAuthorInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReportsInput>
  }

  export type ReportScalarWhereInput = {
    AND?: Enumerable<ReportScalarWhereInput>
    OR?: Enumerable<ReportScalarWhereInput>
    NOT?: Enumerable<ReportScalarWhereInput>
    id?: StringFilter | string
    meetingId?: StringFilter | string
    title?: StringFilter | string
    summary?: StringNullableFilter | string | null
    content?: StringNullableFilter | string | null
    status?: EnumReportStatusFilter | ReportStatus
    authorId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutAuditLogsInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: Enumerable<AuditLogScalarWhereInput>
    OR?: Enumerable<AuditLogScalarWhereInput>
    NOT?: Enumerable<AuditLogScalarWhereInput>
    id?: StringFilter | string
    model?: StringFilter | string
    modelId?: StringFilter | string
    action?: StringFilter | string
    actorId?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
    diff?: JsonNullableFilter
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutNotificationsInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: Enumerable<NotificationScalarWhereInput>
    OR?: Enumerable<NotificationScalarWhereInput>
    NOT?: Enumerable<NotificationScalarWhereInput>
    id?: StringFilter | string
    meetingId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    channel?: EnumNotificationChannelFilter | NotificationChannel
    scheduledAt?: DateTimeFilter | Date | string
    sentAt?: DateTimeNullableFilter | Date | string | null
    status?: EnumNotificationStatusFilter | NotificationStatus
    createdAt?: DateTimeFilter | Date | string
  }

  export type ReportActionItemUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ReportActionItemWhereUniqueInput
    update: XOR<ReportActionItemUpdateWithoutOwnerInput, ReportActionItemUncheckedUpdateWithoutOwnerInput>
    create: XOR<ReportActionItemCreateWithoutOwnerInput, ReportActionItemUncheckedCreateWithoutOwnerInput>
  }

  export type ReportActionItemUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ReportActionItemWhereUniqueInput
    data: XOR<ReportActionItemUpdateWithoutOwnerInput, ReportActionItemUncheckedUpdateWithoutOwnerInput>
  }

  export type ReportActionItemUpdateManyWithWhereWithoutOwnerInput = {
    where: ReportActionItemScalarWhereInput
    data: XOR<ReportActionItemUpdateManyMutationInput, ReportActionItemUncheckedUpdateManyWithoutOwnedActionItemsInput>
  }

  export type ReportActionItemScalarWhereInput = {
    AND?: Enumerable<ReportActionItemScalarWhereInput>
    OR?: Enumerable<ReportActionItemScalarWhereInput>
    NOT?: Enumerable<ReportActionItemScalarWhereInput>
    id?: StringFilter | string
    reportId?: StringFilter | string
    description?: StringFilter | string
    ownerId?: StringNullableFilter | string | null
    dueDate?: DateTimeNullableFilter | Date | string | null
    done?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
  }

  export type AttachmentUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutUploadedByInput, AttachmentUncheckedUpdateWithoutUploadedByInput>
    create: XOR<AttachmentCreateWithoutUploadedByInput, AttachmentUncheckedCreateWithoutUploadedByInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutUploadedByInput, AttachmentUncheckedUpdateWithoutUploadedByInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutUploadedByInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutUploadedAttachmentsInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: Enumerable<AttachmentScalarWhereInput>
    OR?: Enumerable<AttachmentScalarWhereInput>
    NOT?: Enumerable<AttachmentScalarWhereInput>
    id?: StringFilter | string
    filename?: StringFilter | string
    url?: StringFilter | string
    meetingId?: StringNullableFilter | string | null
    reportId?: StringNullableFilter | string | null
    uploadedById?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutMeetingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutMeetingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutMeetingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
  }

  export type MeetingParticipantCreateWithoutMeetingInput = {
    id?: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutParticipantsInput
  }

  export type MeetingParticipantUncheckedCreateWithoutMeetingInput = {
    id?: string
    userId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type MeetingParticipantCreateOrConnectWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    create: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingParticipantCreateManyMeetingInputEnvelope = {
    data: Enumerable<MeetingParticipantCreateManyMeetingInput>
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutMeetingInput = {
    id?: string
    filename: string
    url: string
    createdAt?: Date | string
    report?: ReportCreateNestedOneWithoutAttachmentsInput
    uploadedBy?: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutMeetingInput = {
    id?: string
    filename: string
    url: string
    reportId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type AttachmentCreateOrConnectWithoutMeetingInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutMeetingInput, AttachmentUncheckedCreateWithoutMeetingInput>
  }

  export type AttachmentCreateManyMeetingInputEnvelope = {
    data: Enumerable<AttachmentCreateManyMeetingInput>
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutMeetingInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutReportsInput
    actionItems?: ReportActionItemCreateNestedManyWithoutReportInput
    attachments?: AttachmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutMeetingInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    actionItems?: ReportActionItemUncheckedCreateNestedManyWithoutReportInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutMeetingInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
  }

  export type NotificationCreateWithoutMeetingInput = {
    id?: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutMeetingInput = {
    id?: string
    userId: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutMeetingInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutMeetingInput, NotificationUncheckedCreateWithoutMeetingInput>
  }

  export type NotificationCreateManyMeetingInputEnvelope = {
    data: Enumerable<NotificationCreateManyMeetingInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMeetingsInput = {
    update: XOR<UserUpdateWithoutMeetingsInput, UserUncheckedUpdateWithoutMeetingsInput>
    create: XOR<UserCreateWithoutMeetingsInput, UserUncheckedCreateWithoutMeetingsInput>
  }

  export type UserUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type MeetingParticipantUpsertWithWhereUniqueWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    update: XOR<MeetingParticipantUpdateWithoutMeetingInput, MeetingParticipantUncheckedUpdateWithoutMeetingInput>
    create: XOR<MeetingParticipantCreateWithoutMeetingInput, MeetingParticipantUncheckedCreateWithoutMeetingInput>
  }

  export type MeetingParticipantUpdateWithWhereUniqueWithoutMeetingInput = {
    where: MeetingParticipantWhereUniqueInput
    data: XOR<MeetingParticipantUpdateWithoutMeetingInput, MeetingParticipantUncheckedUpdateWithoutMeetingInput>
  }

  export type MeetingParticipantUpdateManyWithWhereWithoutMeetingInput = {
    where: MeetingParticipantScalarWhereInput
    data: XOR<MeetingParticipantUpdateManyMutationInput, MeetingParticipantUncheckedUpdateManyWithoutParticipantsInput>
  }

  export type AttachmentUpsertWithWhereUniqueWithoutMeetingInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutMeetingInput, AttachmentUncheckedUpdateWithoutMeetingInput>
    create: XOR<AttachmentCreateWithoutMeetingInput, AttachmentUncheckedCreateWithoutMeetingInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutMeetingInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutMeetingInput, AttachmentUncheckedUpdateWithoutMeetingInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutMeetingInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutAttachmentsInput>
  }

  export type ReportUpsertWithoutMeetingInput = {
    update: XOR<ReportUpdateWithoutMeetingInput, ReportUncheckedUpdateWithoutMeetingInput>
    create: XOR<ReportCreateWithoutMeetingInput, ReportUncheckedCreateWithoutMeetingInput>
  }

  export type ReportUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReportsNestedInput
    actionItems?: ReportActionItemUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionItems?: ReportActionItemUncheckedUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type NotificationUpsertWithWhereUniqueWithoutMeetingInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutMeetingInput, NotificationUncheckedUpdateWithoutMeetingInput>
    create: XOR<NotificationCreateWithoutMeetingInput, NotificationUncheckedCreateWithoutMeetingInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutMeetingInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutMeetingInput, NotificationUncheckedUpdateWithoutMeetingInput>
  }

  export type NotificationUpdateManyWithWhereWithoutMeetingInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutNotificationsInput>
  }

  export type MeetingCreateWithoutParticipantsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutMeetingsInput
    attachments?: AttachmentCreateNestedManyWithoutMeetingInput
    report?: ReportCreateNestedOneWithoutMeetingInput
    notifications?: NotificationCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutParticipantsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMeetingInput
    report?: ReportUncheckedCreateNestedOneWithoutMeetingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutParticipantsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
  }

  export type UserCreateWithoutParticipantsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutParticipantsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutParticipantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParticipantsInput, UserUncheckedCreateWithoutParticipantsInput>
  }

  export type MeetingUpsertWithoutParticipantsInput = {
    update: XOR<MeetingUpdateWithoutParticipantsInput, MeetingUncheckedUpdateWithoutParticipantsInput>
    create: XOR<MeetingCreateWithoutParticipantsInput, MeetingUncheckedCreateWithoutParticipantsInput>
  }

  export type MeetingUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutMeetingsNestedInput
    attachments?: AttachmentUpdateManyWithoutMeetingNestedInput
    report?: ReportUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutMeetingNestedInput
    report?: ReportUncheckedUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type UserUpsertWithoutParticipantsInput = {
    update: XOR<UserUpdateWithoutParticipantsInput, UserUncheckedUpdateWithoutParticipantsInput>
    create: XOR<UserCreateWithoutParticipantsInput, UserUncheckedCreateWithoutParticipantsInput>
  }

  export type UserUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type MeetingCreateWithoutNotificationsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutMeetingsInput
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentCreateNestedManyWithoutMeetingInput
    report?: ReportCreateNestedOneWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutNotificationsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMeetingInput
    report?: ReportUncheckedCreateNestedOneWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutNotificationsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutNotificationsInput, MeetingUncheckedCreateWithoutNotificationsInput>
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type MeetingUpsertWithoutNotificationsInput = {
    update: XOR<MeetingUpdateWithoutNotificationsInput, MeetingUncheckedUpdateWithoutNotificationsInput>
    create: XOR<MeetingCreateWithoutNotificationsInput, MeetingUncheckedCreateWithoutNotificationsInput>
  }

  export type MeetingUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutMeetingsNestedInput
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUpdateManyWithoutMeetingNestedInput
    report?: ReportUpdateOneWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMeetingNestedInput
    report?: ReportUncheckedUpdateOneWithoutMeetingNestedInput
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type MeetingCreateWithoutReportInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutMeetingsInput
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentCreateNestedManyWithoutMeetingInput
    notifications?: NotificationCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutReportInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    attachments?: AttachmentUncheckedCreateNestedManyWithoutMeetingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutReportInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutReportInput, MeetingUncheckedCreateWithoutReportInput>
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type ReportActionItemCreateWithoutReportInput = {
    id?: string
    description: string
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
    owner?: UserCreateNestedOneWithoutOwnedActionItemsInput
  }

  export type ReportActionItemUncheckedCreateWithoutReportInput = {
    id?: string
    description: string
    ownerId?: string | null
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type ReportActionItemCreateOrConnectWithoutReportInput = {
    where: ReportActionItemWhereUniqueInput
    create: XOR<ReportActionItemCreateWithoutReportInput, ReportActionItemUncheckedCreateWithoutReportInput>
  }

  export type ReportActionItemCreateManyReportInputEnvelope = {
    data: Enumerable<ReportActionItemCreateManyReportInput>
    skipDuplicates?: boolean
  }

  export type AttachmentCreateWithoutReportInput = {
    id?: string
    filename: string
    url: string
    createdAt?: Date | string
    meeting?: MeetingCreateNestedOneWithoutAttachmentsInput
    uploadedBy?: UserCreateNestedOneWithoutUploadedAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutReportInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type AttachmentCreateOrConnectWithoutReportInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutReportInput, AttachmentUncheckedCreateWithoutReportInput>
  }

  export type AttachmentCreateManyReportInputEnvelope = {
    data: Enumerable<AttachmentCreateManyReportInput>
    skipDuplicates?: boolean
  }

  export type MeetingUpsertWithoutReportInput = {
    update: XOR<MeetingUpdateWithoutReportInput, MeetingUncheckedUpdateWithoutReportInput>
    create: XOR<MeetingCreateWithoutReportInput, MeetingUncheckedCreateWithoutReportInput>
  }

  export type MeetingUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutMeetingsNestedInput
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUpdateManyWithoutMeetingNestedInput
    notifications?: NotificationUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMeetingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type ReportActionItemUpsertWithWhereUniqueWithoutReportInput = {
    where: ReportActionItemWhereUniqueInput
    update: XOR<ReportActionItemUpdateWithoutReportInput, ReportActionItemUncheckedUpdateWithoutReportInput>
    create: XOR<ReportActionItemCreateWithoutReportInput, ReportActionItemUncheckedCreateWithoutReportInput>
  }

  export type ReportActionItemUpdateWithWhereUniqueWithoutReportInput = {
    where: ReportActionItemWhereUniqueInput
    data: XOR<ReportActionItemUpdateWithoutReportInput, ReportActionItemUncheckedUpdateWithoutReportInput>
  }

  export type ReportActionItemUpdateManyWithWhereWithoutReportInput = {
    where: ReportActionItemScalarWhereInput
    data: XOR<ReportActionItemUpdateManyMutationInput, ReportActionItemUncheckedUpdateManyWithoutActionItemsInput>
  }

  export type AttachmentUpsertWithWhereUniqueWithoutReportInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutReportInput, AttachmentUncheckedUpdateWithoutReportInput>
    create: XOR<AttachmentCreateWithoutReportInput, AttachmentUncheckedCreateWithoutReportInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutReportInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutReportInput, AttachmentUncheckedUpdateWithoutReportInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutReportInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutAttachmentsInput>
  }

  export type ReportCreateWithoutActionItemsInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutReportInput
    author: UserCreateNestedOneWithoutReportsInput
    attachments?: AttachmentCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutActionItemsInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutActionItemsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutActionItemsInput, ReportUncheckedCreateWithoutActionItemsInput>
  }

  export type UserCreateWithoutOwnedActionItemsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutOwnedActionItemsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutOwnedActionItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedActionItemsInput, UserUncheckedCreateWithoutOwnedActionItemsInput>
  }

  export type ReportUpsertWithoutActionItemsInput = {
    update: XOR<ReportUpdateWithoutActionItemsInput, ReportUncheckedUpdateWithoutActionItemsInput>
    create: XOR<ReportCreateWithoutActionItemsInput, ReportUncheckedCreateWithoutActionItemsInput>
  }

  export type ReportUpdateWithoutActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutReportNestedInput
    author?: UserUpdateOneRequiredWithoutReportsNestedInput
    attachments?: AttachmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: AttachmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type UserUpsertWithoutOwnedActionItemsInput = {
    update: XOR<UserUpdateWithoutOwnedActionItemsInput, UserUncheckedUpdateWithoutOwnedActionItemsInput>
    create: XOR<UserCreateWithoutOwnedActionItemsInput, UserUncheckedCreateWithoutOwnedActionItemsInput>
  }

  export type UserUpdateWithoutOwnedActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type MeetingCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutMeetingsInput
    participants?: MeetingParticipantCreateNestedManyWithoutMeetingInput
    report?: ReportCreateNestedOneWithoutMeetingInput
    notifications?: NotificationCreateNestedManyWithoutMeetingInput
  }

  export type MeetingUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    organizerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutMeetingInput
    report?: ReportUncheckedCreateNestedOneWithoutMeetingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutMeetingInput
  }

  export type MeetingCreateOrConnectWithoutAttachmentsInput = {
    where: MeetingWhereUniqueInput
    create: XOR<MeetingCreateWithoutAttachmentsInput, MeetingUncheckedCreateWithoutAttachmentsInput>
  }

  export type ReportCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    meeting: MeetingCreateNestedOneWithoutReportInput
    author: UserCreateNestedOneWithoutReportsInput
    actionItems?: ReportActionItemCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    actionItems?: ReportActionItemUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutAttachmentsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAttachmentsInput, ReportUncheckedCreateWithoutAttachmentsInput>
  }

  export type UserCreateWithoutUploadedAttachmentsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutUploadedAttachmentsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutUploadedAttachmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
  }

  export type MeetingUpsertWithoutAttachmentsInput = {
    update: XOR<MeetingUpdateWithoutAttachmentsInput, MeetingUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<MeetingCreateWithoutAttachmentsInput, MeetingUncheckedCreateWithoutAttachmentsInput>
  }

  export type MeetingUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutMeetingsNestedInput
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    report?: ReportUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    organizerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    report?: ReportUncheckedUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type ReportUpsertWithoutAttachmentsInput = {
    update: XOR<ReportUpdateWithoutAttachmentsInput, ReportUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<ReportCreateWithoutAttachmentsInput, ReportUncheckedCreateWithoutAttachmentsInput>
  }

  export type ReportUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutReportNestedInput
    author?: UserUpdateOneRequiredWithoutReportsNestedInput
    actionItems?: ReportActionItemUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionItems?: ReportActionItemUncheckedUpdateManyWithoutReportNestedInput
  }

  export type UserUpsertWithoutUploadedAttachmentsInput = {
    update: XOR<UserUpdateWithoutUploadedAttachmentsInput, UserUncheckedUpdateWithoutUploadedAttachmentsInput>
    create: XOR<UserCreateWithoutUploadedAttachmentsInput, UserUncheckedCreateWithoutUploadedAttachmentsInput>
  }

  export type UserUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutAuthorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentCreateNestedManyWithoutUploadedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    hashedPassword?: string | null
    role?: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    meetings?: MeetingUncheckedCreateNestedManyWithoutOrganizerInput
    participants?: MeetingParticipantUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutAuthorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    ownedActionItems?: ReportActionItemUncheckedCreateNestedManyWithoutOwnerInput
    uploadedAttachments?: AttachmentUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutAuthorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUpdateManyWithoutUploadedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meetings?: MeetingUncheckedUpdateManyWithoutOrganizerNestedInput
    participants?: MeetingParticipantUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutAuthorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    ownedActionItems?: ReportActionItemUncheckedUpdateManyWithoutOwnerNestedInput
    uploadedAttachments?: AttachmentUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type MeetingCreateManyOrganizerInput = {
    id?: string
    title: string
    description?: string | null
    type?: string | null
    date: Date | string
    startTime?: Date | string | null
    endTime?: Date | string | null
    location?: string | null
    agenda?: string | null
    status?: MeetingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MeetingParticipantCreateManyUserInput = {
    id?: string
    meetingId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type ReportCreateManyAuthorInput = {
    id?: string
    meetingId: string
    title: string
    summary?: string | null
    content?: string | null
    status?: ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyActorInput = {
    id?: string
    model: string
    modelId: string
    action: string
    timestamp?: Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    meetingId?: string | null
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type ReportActionItemCreateManyOwnerInput = {
    id?: string
    reportId: string
    description: string
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type AttachmentCreateManyUploadedByInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    reportId?: string | null
    createdAt?: Date | string
  }

  export type MeetingUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUpdateManyWithoutMeetingNestedInput
    report?: ReportUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participants?: MeetingParticipantUncheckedUpdateManyWithoutMeetingNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutMeetingNestedInput
    report?: ReportUncheckedUpdateOneWithoutMeetingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutMeetingNestedInput
  }

  export type MeetingUncheckedUpdateManyWithoutMeetingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    agenda?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumMeetingStatusFieldUpdateOperationsInput | MeetingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantUncheckedUpdateManyWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneRequiredWithoutReportNestedInput
    actionItems?: ReportActionItemUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionItems?: ReportActionItemUncheckedUpdateManyWithoutReportNestedInput
    attachments?: AttachmentUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogUncheckedUpdateManyWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    diff?: NullableJsonNullValueInput | InputJsonValue
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutActionItemsNestedInput
  }

  export type ReportActionItemUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemUncheckedUpdateManyWithoutOwnedActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneWithoutAttachmentsNestedInput
    report?: ReportUpdateOneWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateManyWithoutUploadedAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingParticipantCreateManyMeetingInput = {
    id?: string
    userId: string
    status?: ParticipantStatus
    role?: string | null
    createdAt?: Date | string
  }

  export type AttachmentCreateManyMeetingInput = {
    id?: string
    filename: string
    url: string
    reportId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyMeetingInput = {
    id?: string
    userId: string
    channel: NotificationChannel
    scheduledAt: Date | string
    sentAt?: Date | string | null
    status?: NotificationStatus
    createdAt?: Date | string
  }

  export type MeetingParticipantUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type MeetingParticipantUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumParticipantStatusFieldUpdateOperationsInput | ParticipantStatus
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneWithoutAttachmentsNestedInput
    uploadedBy?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUncheckedUpdateManyWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutMeetingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | NotificationChannel
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumNotificationStatusFieldUpdateOperationsInput | NotificationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemCreateManyReportInput = {
    id?: string
    description: string
    ownerId?: string | null
    dueDate?: Date | string | null
    done?: boolean
    createdAt?: Date | string
  }

  export type AttachmentCreateManyReportInput = {
    id?: string
    filename: string
    url: string
    meetingId?: string | null
    uploadedById?: string | null
    createdAt?: Date | string
  }

  export type ReportActionItemUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutOwnedActionItemsNestedInput
  }

  export type ReportActionItemUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportActionItemUncheckedUpdateManyWithoutActionItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    meeting?: MeetingUpdateOneWithoutAttachmentsNestedInput
    uploadedBy?: UserUpdateOneWithoutUploadedAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    meetingId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}