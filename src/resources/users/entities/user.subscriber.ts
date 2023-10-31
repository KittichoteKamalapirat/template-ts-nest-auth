import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { v4 } from "uuid";
import { User } from "./user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const newUser = event.entity;



    if (!newUser.photoUrl) {
      const uuid = v4();
      newUser.photoUrl = `https://avatars.dicebear.com/api/open-peeps/${uuid}.png`;
      await event.manager.save(newUser);
    }
  }
}
