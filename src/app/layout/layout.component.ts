import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    nome: string;
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

    ngOnInit(): void {
        this.nome = 'Luiz Paulo Bellumat';
     }
    
    ngAfterViewInit(): void {
        this._cdr.detectChanges()    
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
