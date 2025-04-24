import { SSOContainer } from '@kigo-top/components';

type Props = {
  params: Promise<{ externalProgramId: string }>;
  searchParams: Promise<{ uuid?: string }>;
};

export default async function page({ params, searchParams }: Props) {
  const { externalProgramId } = await params;
  const { uuid } = await searchParams;

  return <SSOContainer externalProgramId={externalProgramId} uuid={uuid} />;
}
