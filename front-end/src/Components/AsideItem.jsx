import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

export default function AsideItem(props){
    return <div className="flex items-center justify-between text-white text-lg gap-3 p-1"><FontAwesomeIcon icon={props.icon}/> {props.text}</div>
}

AsideItem.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
}