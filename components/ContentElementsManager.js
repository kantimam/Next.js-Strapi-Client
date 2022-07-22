import FormattedText from './contentElements/FormattedText';
import Gallery from './contentElements/Gallery';
import ImageTransition from './contentElements/ImageTransition';
import Stage from './contentElements/Stage';
import TextWithMedia from './contentElements/TextWithMedia';
import Video from './contentElements/Video';


const knownContentElements = {
  'content-elements.content': () => <div>content block placeholder</div>,
  'content-elements.text': FormattedText,
  'content-elements.stage': Stage,
  'content-elements.textWithMedia': TextWithMedia,
  'content-elements.video': Video,
  'content-elements.gallery': Gallery,
  'content-elements.imageTransition': ImageTransition
}


const getContentElementComponent = ({ __component, ...rest }, index) => {
  const Block = knownContentElements[__component];

  return Block ? <Block key={`index-${index}`} {...rest} /> : <p key={`index-${index}`}>no block for the type {__component} implemented yet</p>;
};



const ContentElementManager = ({ contentElements = [] }) => {
  if (!contentElements || !contentElements.length) return <p>page does not have any content elements yet</p>
  return <>{contentElements.map(getContentElementComponent)}</>;
};



export default ContentElementManager;