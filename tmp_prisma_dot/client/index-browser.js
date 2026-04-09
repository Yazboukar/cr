
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('@prisma/client/runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.16.2
 * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
 */
Prisma.prismaVersion = {
  client: "4.16.2",
  engine: "4bc8b6e1b66cb932731fb1bdbbc550d1e010de81"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  image: 'image',
  hashedPassword: 'hashedPassword',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MeetingScalarFieldEnum = {
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

exports.Prisma.MeetingParticipantScalarFieldEnum = {
  id: 'id',
  meetingId: 'meetingId',
  userId: 'userId',
  status: 'status',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  meetingId: 'meetingId',
  userId: 'userId',
  channel: 'channel',
  scheduledAt: 'scheduledAt',
  sentAt: 'sentAt',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ReportScalarFieldEnum = {
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

exports.Prisma.ReportActionItemScalarFieldEnum = {
  id: 'id',
  reportId: 'reportId',
  description: 'description',
  ownerId: 'ownerId',
  dueDate: 'dueDate',
  done: 'done',
  createdAt: 'createdAt'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  filename: 'filename',
  url: 'url',
  meetingId: 'meetingId',
  reportId: 'reportId',
  uploadedById: 'uploadedById',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  model: 'model',
  modelId: 'modelId',
  action: 'action',
  actorId: 'actorId',
  timestamp: 'timestamp',
  diff: 'diff'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  PARTICIPANT: 'PARTICIPANT',
  REPORTER: 'REPORTER'
};

exports.MeetingStatus = {
  PLANNED: 'PLANNED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.ParticipantStatus = {
  INVITED: 'INVITED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED',
  ATTENDED: 'ATTENDED',
  ABSENT: 'ABSENT'
};

exports.NotificationChannel = {
  EMAIL: 'EMAIL',
  IN_APP: 'IN_APP',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP'
};

exports.NotificationStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

exports.ReportStatus = {
  DRAFT: 'DRAFT',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  ARCHIVED: 'ARCHIVED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Meeting: 'Meeting',
  MeetingParticipant: 'MeetingParticipant',
  Notification: 'Notification',
  Report: 'Report',
  ReportActionItem: 'ReportActionItem',
  Attachment: 'Attachment',
  AuditLog: 'AuditLog'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
