import { neon } from '@neondatabase/serverless';
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon('postgresql://Expense-Tracker_owner:HMc6sk5ptTVP@ep-red-dream-a54cqyx9.us-east-2.aws.neon.tech/Expensify?sslmode=require');
export const db = drizzle(sql,{schema});