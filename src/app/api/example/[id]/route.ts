import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import prismaClient from '../../../../lib/prisma';
import { NextApiRequest } from 'next';

//67b7e4e09a453a95cbeeab0d
const GET = async (request: NextApiRequest) => {
  const { searchParams } = new URL(request.url as string);
  const { userId } = Object.fromEntries(searchParams);

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const example = await prismaClient.example.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(example);
  } catch (err) {
    return NextResponse.json(
      { message: 'Example not found', error: err },
      { status: 400 }
    );
  }
};

async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, userId } = await request.json();

  try {
    await prismaClient.example.create({
      data: {
        name,
        userId: userId,
      },
    });

    return NextResponse.json({ message: 'Example cadastrado com sucesso!' });
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed crete new customer', error: err },
      { status: 400 }
    );
  }
}

export { GET, POST };
