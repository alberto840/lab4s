import { ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { devTools } from '@ngneat/elf-devtools';

platformBrowserDynamic()
  .bootstrapModule(AppModule).then((moduleRef) => {
    devTools({
      postTimelineUpdate: () => moduleRef.injector.get(ApplicationRef).tick()
    });
})
