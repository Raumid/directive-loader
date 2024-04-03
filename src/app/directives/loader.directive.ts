import { Directive, ElementRef, Renderer2, effect } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Directive({
  selector: '[appLoader]',
  standalone: true
})
export class LoaderDirective {

  startText = '';

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private loaderService: LoaderService
  ) { 
    effect(() => {
      console.log("Directive", this.loaderService.isLoading());
      if(this.loaderService.isLoading()){
        this.disabled();
      }else {
        this.enabled();
      }
    });

    
   
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.startText = this.getElBtn().textContent || '';
  }

  private disabled():void {
    this.getElBtn().disabled = true;

    this.getElBtn().textContent = 'Cargando...';

    const elementI = this.renderer2.createElement('i');
    this.renderer2.addClass(elementI, 'fa');
    this.renderer2.addClass(elementI, 'fa-circle-o-notch');
    this.renderer2.addClass(elementI, 'fa-spin');

    this.renderer2.appendChild(this.el.nativeElement, elementI);
  }

  private enabled():void {
    this.getElBtn().disabled = false;

    this.getElBtn().textContent = this.startText;

    const spiner = this.getElBtn().querySelector('i');

    if(spiner)
      this.renderer2.removeChild(this.el.nativeElement, spiner);

  }

  private getElBtn():HTMLButtonElement  {
    return this.el.nativeElement as HTMLButtonElement
  }

}
