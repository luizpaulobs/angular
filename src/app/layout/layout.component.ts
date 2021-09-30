import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    constructor(
        public media: MediaMatcher,
        private _cdr: ChangeDetectorRef
    ) {
        this.mobileQuery = this.media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => this._cdr.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void { }
    
    ngAfterViewInit(): void {
        //this._cdr.detectChanges()    
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
