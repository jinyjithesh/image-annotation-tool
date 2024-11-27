import './App.css';
import CardEditor from './components/CardEditor';
import ImageAnnotationTool from './components/ImageAnnotationTool';


function App() {
  return (
    <div className="App">
     <h1>Image Annotation Tool</h1>
  {/* <ImageAnnotationTool/> */}
  <CardEditor/>
    </div>
  );
}

export default App;
