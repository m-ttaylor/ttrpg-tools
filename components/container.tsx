import TopBar from "./topBar";

interface Props {
  children?: React.ReactNode
}

const Container: React.FC<Props> = (props) => (
  <div className="min-h-800">
    <TopBar />
    {props.children}
  </div>
)

export default Container;