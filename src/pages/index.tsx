import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrlClient } from "../utils/createURLClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar>
        <div>
          {!data ? (
            <div>Loading</div>
          ) : (
            data.posts.map((p) => <div key={p.id}>{p.title}</div>)
          )}
        </div>
      </NavBar>
    </>
  );
};

export default withUrqlClient(createUrlClient, { ssr: true })(Index);
