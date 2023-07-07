
export function notificationChanel(chanel) {
    return function (target, propertyKey, descriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function (users) {
        const filteredUsers = users.filter((user) => user.notificationChannel === chanel);
        return originalMethod.apply(this, [filteredUsers]);
      };
    };
  }

