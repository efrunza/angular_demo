import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    // tslint:disable-next-line:no-console
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map