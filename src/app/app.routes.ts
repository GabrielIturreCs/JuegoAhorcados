import { Routes } from '@angular/router';
import { noop } from 'rxjs';

import { Punto3Component } from '../componentes/punto3/punto3.component';

export const routes: Routes = [{


    path: 'punto3',
    component: Punto3Component
}
,
{
    path: '**',
    redirectTo: 'punto3',
}

];
