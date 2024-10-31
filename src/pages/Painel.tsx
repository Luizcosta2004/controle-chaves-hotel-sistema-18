import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/db";

const Painel = () => {
  const { data: chaves = [] } = useQuery({
    queryKey: ["chaves"],
    queryFn: db.getChaves,
  });

  const { data: hospedes = [] } = useQuery({
    queryKey: ["hospedes"],
    queryFn: db.getHospedes,
  });

  const totalChaves = chaves.length;
  const chavesEmUso = chaves.filter((c: any) => c.status === "em uso").length;
  const hospedesAtivos = hospedes.filter((h: any) => h.status === "ativo").length;

  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Painel de Controle</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Total de Chaves</h2>
          <p className="text-3xl">{totalChaves}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Chaves em Uso</h2>
          <p className="text-3xl">{chavesEmUso}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Hóspedes Ativos</h2>
          <p className="text-3xl">{hospedesAtivos}</p>
        </div>
      </div>
    </div>
  );
};

export default Painel;