export class SendInapp {
    posts
    constructor(users, posts) {
        this.posts = posts
        this.sendNotification(users);
    }

    @notificationChanel('inapp')
    sendNotification(users) {
        console.log('SendInapp:', users);
        // Виконати логіку надсилання повідомлень в додатку для users з notificationChanel === 'inapp'
    }
}

export class SendEmail {
    posts
    constructor(users, posts) {
        this.posts = posts
        this.sendNotification(users);
    }

    @notificationChanel('email')
    sendNotification(users) {
        console.log('SendEmail:', users);
        // Виконати логіку відправки електронних листів для users з notificationChanel === 'email'
    }
}

function notificationChanel(chanel) {
    return function (target, propertyKey, descriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function (users) {
        const filteredUsers = users.filter((user) => user.notificationChannel === chanel);
        return originalMethod.apply(this, [filteredUsers]);
      };
    };
  }







