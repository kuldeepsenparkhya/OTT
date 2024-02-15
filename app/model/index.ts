import mongoose from 'mongoose';
import "dotenv/config";

mongoose.connect(`${process.env.DB_URI}`).then(() => console.log('Db connection done.')).catch(err => console.log('Error>>', err.message));


export { default as User } from './user';
export { default as Genre } from './genre';
export { default as Category } from './category';

export { default as Movie } from './movie';
export { default as MovieBanner } from './movieBanner';

export { default as PushNotification } from './pushNotification';
export { default as WatchList } from './watchList';

export { default as Tag } from './tag';
export { default as SubscriptionPlan } from './subscriptionPlan';




