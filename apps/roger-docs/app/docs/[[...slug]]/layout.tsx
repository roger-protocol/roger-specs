import { getSection, source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default async function Layout({ children, params }: LayoutProps<'/docs/[[...slug]]'>) {
  const { slug } = await params
  const page = source.getPage(slug);
  const themeClassName = getSection(page?.path ?? "protocol")

  return (
    <div className={themeClassName}>
      <DocsLayout tree={source.getPageTree()} {...baseOptions()} tabs={{
        transform(option, node) {
          const meta = source.getNodeMeta(node)
          if (!meta || !node.icon) return option;
          const color = `var(--${getSection(meta.path)}-color, var(--color-fd-foreground))`;
          return {
            ...option,
            icon: (
              <div className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"  style={{ "--tab-color": color } as object}>{node.icon}</div>
            ),
            props: {className: themeClassName}
          }
        }
      }}>
        {children}
      </DocsLayout>
    </div>
  );
}
