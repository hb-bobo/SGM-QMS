interface AccordionProps {
  style?: any;
  /** below web only */
  className?: string;
  activeKey?: string | Array<string>;
  defaultActiveKey?: string | Array<string>;
  openAnimation?: any;
  accordion?: boolean;
  onChange?: (x: any) => void;
}

export default AccordionProps;
