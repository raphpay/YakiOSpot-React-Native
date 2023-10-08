class Utils {
  static generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
   }

   static formatDate(date) {
      const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      };
    
      const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    
      return `${formattedDate}`;
   };

   static formatTime(date) {
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
      };
    
      const formattedTime = new Intl.DateTimeFormat('fr-FR', timeOptions).format(date);
    
      return `${formattedTime}`;
   };
}

export default Utils;