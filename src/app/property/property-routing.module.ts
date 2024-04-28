import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'detail',
		loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent)
	},
	{
		path: 'search',
		loadComponent: () => import('./search/search.component').then(m => m.SearchComponent)
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class PropertyRoutingModule { }
