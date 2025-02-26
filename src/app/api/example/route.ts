import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prismaClient from '../../../lib/prisma';
import { NextApiRequest } from 'next';

const GET = async (request: NextApiRequest) => {
  // This is a simple example to get user data
  const { searchParams } = new URL(request.url as string);
  const { email } = Object.fromEntries(searchParams);

  if (!email || email === '') {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: 'User not found', error: err },
      { status: 400 }
    );
  }
};

export { GET };
