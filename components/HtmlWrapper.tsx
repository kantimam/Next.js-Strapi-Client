import parseHtml from 'html-react-parser'
// TODO: find a smaller lib or a native way to do this savely

type Props = {
    htmlString: string
}

const HtmlWrapper = ({ htmlString }: Props) => {
    if (!htmlString || !htmlString.length) return <p>invalid HTML String provided.</p>
    const reactNodesFromHtmlString = parseHtml(htmlString);
    return (
        <div className="prose text-wrapper">
            {reactNodesFromHtmlString}
        </div>
    )
}

export default HtmlWrapper