import Breadcumbs from "@/app/components/Breadcumbs";
import { Checkbox } from "@nextui-org/checkbox";
import { Kbd } from "@nextui-org/kbd";
import { Spacer } from "@nextui-org/spacer";
import { Metadata } from "next";
import CraftBy from "./component/CraftBy";
export const metadata: Metadata = {
  title: "About",
  description: "Description about Worklist, some features, and how to use it.",
};
function AboutPage() {
  return (
    <div className="pt-2 h-screen min-w-[300px] overflow-auto space-y-4 relative">
      <Breadcumbs
        className="px-4"
        items={[
          {
            label: "Home",
            href: "",
            disabled: true,
          },
          {
            label: "About",
            href: "/about",
          },
        ]}
      />
      <article className="prose prose-sm mx-auto prose-slate dark:prose-invert max-w-none px-4 mb-8">
        <h1 className="text-2xl font-bold">About</h1>
        <h2>About the website</h2>
        <p>
          Worklist is a simple task management app. That helps you to manage
          your tasks, todos, and worksplaces. We provide a simple and easy to
          use interface to manage your tasks.
        </p>
        <p>
          The aim of this project is to provide a simple and easy to use task.
          By intergrating you local storage, you can save your tasks and access
          them anytime. This also provide a secure way to store your tasks. We
          do not store any of your tasks on our server.
        </p>
        <h2>Features</h2>
        The main focus of this project is showcase animations, transitions and
        UI components. However it still bring the core features of a task
        management app. Here are some of the features:
        <ul>
          <li>Dark mode support</li>
          <li>
            Local storage save
            <ul>
              <li>Export into csv or json</li>
              <li>Restore your tasks anytime</li>
            </ul>
          </li>
          <li>Simple and easy to use interface</li>
          <li>Create, update, delete tasks</li>
          <li>
            Preserve deleted tasks, so you can restore them if you accidently
          </li>
          <li>
            Global search, search your tasks from anywhere in the app by
            using&nbsp;
            <Kbd className="text-xs" keys={["command"]}>
              K
            </Kbd>
            (Mac) or&nbsp;
            <Kbd className="text-xs" keys={["ctrl"]}>
              K
            </Kbd>
            (Windows)
          </li>
          <li>
            Context menu, <span className="underline">right click</span> on a
            task to see more options like
            <ul>
              <li>Restore</li>
              <li>Delete</li>
              <li>Copy</li>
              <li>Move to</li>
            </ul>
          </li>
          <li>
            Command menu pop up when you&nbsp;
            <span className="underline">select a table row</span>, all the allow
            actions will be shown in the command menu
          </li>
          <li>
            Full text-search, search your tasks by name, description, or any of
            your tags
          </li>
        </ul>
        <h2>What next?</h2>
        <p>
          We are still working on this project, and we have a lot of features
          that we are planning to add. Here are some of the features that we are
          planning to add:
        </p>
        <ul className="list-none">
          <li>
            <Checkbox
              size="sm"
              defaultChecked={true}
              defaultSelected
              isReadOnly
              checked={true}
              lineThrough
            >
              <span className="line-through">Tags</span>
            </Checkbox>
          </li>
          <li>
            <Checkbox
              size="sm"
              defaultChecked={true}
              defaultSelected
              isReadOnly
              checked={true}
              lineThrough
            >
              <span className="line-through">Global search</span>
            </Checkbox>
          </li>
          <li>
            <Checkbox size="sm" isReadOnly>
              Dashboard to show your tasks in a chart
            </Checkbox>
          </li>
          <li>
            <Checkbox size="sm" isReadOnly>
              Cloud backup
            </Checkbox>
          </li>
        </ul>
        <CraftBy />
        <Spacer y={24} />
      </article>
    </div>
  );
}

export default AboutPage;
