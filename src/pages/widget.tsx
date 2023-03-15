import Layout from "@/components/Layout";

const Widget = () => {
  return (
    <Layout>
     <div className="mx-auto border rounded bg-white">
        <div className="p-8 sm:p-10 lg:flex-auto"></div>
          <div className="flex flex-col gap-2 min-h-full">
            <label className="block">
              <span className="text-grey-700">Test input</span>
              <input type="text" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-grey-700">Test input 2</span>
              <input type="text" className="form-input mt-1 block w-full" />
            </label>
            <input type="text" />
          </div>
        </div>
    </Layout>
  );
}

export default Widget;
