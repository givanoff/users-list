import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  private oldConsoleLog = null;

  enableLogger() {
    if (this.oldConsoleLog == null) { return; }

    window['console']['log'] = this.oldConsoleLog;
  };

  disableLogger() {
    this.oldConsoleLog = console.log();
    window['console']['log'] = function () { };
  };

}
