class Session {
    constructor(username, expiresAt, user_id) {
      this.username = username;
      this.expiresAt = expiresAt;
      this.user_id = user_id;
    }
  
    isExpired() {
      return this.expiresAt < new Date();
    }
  }
  
  
  const sessions = {};
  
  module.exports = { Session, sessions };
  