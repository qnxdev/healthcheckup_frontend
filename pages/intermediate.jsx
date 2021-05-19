import { Button } from "../components/Button";
import Page from "../components/Page";

export default function Predictions(params) {
  return (
    <Page title="Predictions">
      <div className="goback"><Button link='/' title="Go back to previous stage" inverted>Previous</Button></div>
      <div className="predictions">
        <h2>Prediction Results: </h2>
        <Button link='/result' title="See solutions for this disease">Find solutions</Button>
      </div>
    </Page>
  );
}
