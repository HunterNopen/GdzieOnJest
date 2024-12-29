const mongoose = require('mongoose');

class UnitOfWork {
  constructor() {
    this.session = null;
  }

  async start() {
    this.session = await mongoose.startSession();
    this.session.startTransaction();
  }

  async commit() {
    if (this.session) {
      await this.session.commitTransaction();
      this.session.endSession();
      this.session = null;
    }
  }

  async rollback() {
    if (this.session) {
      await this.session.abortTransaction();
      this.session.endSession();
      this.session = null;
    }
  }

  getSession() {
    if (!this.session) {
      throw new Error("UnitOfWork: No active session. Call 'start()' first.");
    }
    return this.session;
  }
}

module.exports = UnitOfWork;
