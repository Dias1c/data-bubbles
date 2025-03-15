import { useHandleUrlHistoryNavigation } from "@/shared/hooks/useHandleUrlHistoryNavigation";
import { historyPushState } from "@/shared/lib/window/historyChangeState";
import { useEffect } from "react";
import { useTabs } from "./useTabs";

export function useUrlTabs<T extends string>({
  actionSelect,
  defaultSelected,
  canBeSelected,
  name,
}: {
  name: string;
  canBeSelected?: (props: { value?: T }) => boolean;
} & Parameters<typeof useTabs<T>>[0]) {
  const tabs = useTabs<T>({
    actionSelect,
  });

  useEffect(() => {
    let activeTab = new URL(window.location.href).searchParams.get(name) as
      | T
      | undefined;
    if (canBeSelected && !canBeSelected({ value: activeTab })) {
      activeTab = defaultSelected;
    }
    tabs.select({
      value: activeTab ?? defaultSelected,
    });
  }, [name]);

  useHandleUrlHistoryNavigation(({ url }) => {
    const activeTab = url.searchParams.get(name);
    tabs.select({ value: activeTab as T });
  });

  const select: ReturnType<typeof useTabs<T>>["select"] = async (...props) => {
    const [p1, p2, ...pr] = props;

    await tabs.select(
      p1,
      {
        ...p2,

        onSuccess: async (props) => {
          await p2?.onSuccess?.(props);
          const { value } = props;
          historyPushState({
            update: ({ url }) => {
              if (value != undefined) {
                url.searchParams.set(name, value);
                return;
              }
              url.searchParams.delete(name);
            },
          });
        },
      },

      ...pr
    );
  };

  return {
    ...tabs,
    select,
  };
}
