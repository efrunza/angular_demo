// TODO: Delete this model if otherwise not used. (The below values are currently being used independently from this file )
export interface IFlexLayout {
  matCard: IFlex;
  formContainer: IFlex;
  formRow: IFlex;
  matCardHeader: IFlex;
  matCardContent: IFlex;
  matFormFieldContainer: IFlex;
  matCardActions: IFlex;
}

export interface IFlex {
  fxLayout?;
  fxLayoutAlign?;
  fxLayoutGap?;
  fxFlex?;
  fxFlexLtMd?;
}

export class FlexAPI implements IFlexLayout {
  constructor(
    public matCard: IFlex = {
      fxLayout: 'column',
      fxLayoutAlign: 'center'
    },
    public formContainer = {
      fxLayout: 'row wrap',
      fxLayoutAlign: 'center start'
    },
    public formRow = {
      fxLayout: 'row',
      fxLayoutAlign: 'center',
      fxFlex: '100%'
    },
    public matCardHeader: IFlex = {
      fxLayout: 'row',
      fxLayoutAlign: 'start center',
      fxLayoutGap: '2em',
      fxFlex: 'calc(100% + 32px)'
    },
    public matCardContent: IFlex = {
      fxLayout: 'column',
      fxLayoutAlign: 'start start',
      fxLayoutGap: '1em',
      fxFlex: '85%',
      fxFlexLtMd: '95%'
    },
    public matFormFieldContainer: IFlex = {
      fxLayout: 'column',
      fxLayoutGap: '0.5em',
      fxFlex: '100%'
    },
    public matCardActions: IFlex = {
      fxLayout: 'row',
      fxLayoutAlign: 'space-between center',
      fxFlex: 'grow'
    }
  ) {}
}
