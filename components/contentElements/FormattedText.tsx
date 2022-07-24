import HtmlWrapper from "../HtmlWrapper";

type Props = {
  id: string | number;
  __component: string;
  bodyText: string;
};

const FormattedText = ({ bodyText }: Props) => (
  <div className="prose text-wrapper">
    <HtmlWrapper htmlString={bodyText} />
  </div>
);

export default FormattedText;
