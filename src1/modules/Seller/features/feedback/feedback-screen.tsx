import { MainLayout } from "../../../../layouts/main-layout";
import { FeedBackForm } from "./components/feedback-form";

export function FeedbackScreen() {
  return (
    <MainLayout title='Feedback'>
      <FeedBackForm />
    </MainLayout>
  );
}
