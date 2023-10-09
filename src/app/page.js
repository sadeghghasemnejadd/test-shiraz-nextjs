"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { renderToString } from "react-dom/server";
import Stream from "@/components/Stream";

async function getData(ticket) {
  const data = await fetch("http://shserver.top:8080/test/users/getData", {
    method: "Get",
    headers: {
      Authorization: `Bearer ${ticket}`,
    },
  });
  const res = await data.json();
  return res;
}

export default function Home() {
  const { isAuthneticated, user } = useAuth();
  const [result, setResult] = useState();
  const router = useRouter();
  useEffect(() => {
    !isAuthneticated && router.push("/login");
  }, [isAuthneticated]);
  useEffect(() => {
    const getRes = async () => {
      const res = await getData(user.ticket);
      if (res) {
        setResult(res.result);
      }
    };
    if (user) {
      getRes();
    }
  }, [user]);

  const htmlEl = ReactHtmlParser(result);
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-44">
      {result && (
        <div>
          {htmlEl[0]}
          {{
            ...htmlEl[1],
            props: {
              children: htmlEl[1].props.children.map((ch) =>
                renderToString(ch)
              ),
            },
          }}
        </div>
      )}
      {user?.ticket && (
        <Suspense fallback={<p>loading...</p>}>
          <Stream ticket={user?.ticket} />
        </Suspense>
      )}
    </main>
  );
}
