"use client";

import { useState, useRef, useMemo, useEffect, KeyboardEvent } from "react";
import { Trash2, Upload, Plus, X, Pencil, LogOut, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/LoginModal";
import { signOut } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  addCustomProduct,
  removeCustomProduct,
  updateCustomProduct,
  useCustomProducts,
} from "@/hooks/useProducts";
import type { Product } from "@/data/products";

const CATEGORIES = ["Tortas", "Desayunos", "Tartas", "Cupcakes"];

const Admin = () => {
  const { user, loading } = useAuth();
  const { products: custom, loading: productsLoading, error: productsError } = useCustomProducts();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tortas");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [useInHero, setUseInHero] = useState(false);
  const [useInAbout, setUseInAbout] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 5;

  const filteredCustom = useMemo(() => {
    const reversed = [...custom].reverse();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return reversed;
    return reversed.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false),
    );
  }, [custom, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCustom.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustom = filteredCustom.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getVisiblePages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
    }
    return pages;
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditingImage(p.image);
    setName(p.name);
    setDescription(p.description);
    setCategory(p.category);
    setPrice(p.price || "");
    setImage(p.image);
    setTags(p.tags || []);
    setTagInput("");
    setUseInHero(!!p.useInHero);
    setUseInAbout(!!p.useInAbout);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  const addTag = (raw: string) => {
    const value = raw.trim().replace(/,+$/, "").slice(0, 50);
    if (!value) return;
    setTags((prev) => (prev.includes(value) || prev.length >= 20 ? prev : [...prev, value]));
    setTagInput("");
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Archivo inválido", description: "Subí una imagen.", variant: "destructive" });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast({ title: "Imagen muy grande", description: "Máx 3MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImage(String(e.target?.result || ""));
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setName("");
    setDescription("");
    setCategory("Tortas");
    setPrice("");
    setImage("");
    setTags([]);
    setTagInput("");
    setUseInHero(false);
    setUseInAbout(false);
    setEditingId(null);
    setEditingImage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image) {
      toast({
        title: "Faltan datos",
        description: "Nombre e imagen son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const finalTags = tagInput.trim() ? [...tags, tagInput.trim().slice(0, 50)] : tags;
    const payload = {
      name: name.trim().slice(0, 100),
      description: description.trim().slice(0, 500),
      category,
      price: price.trim().slice(0, 20),
      image,
      tags: finalTags,
      useInHero,
      useInAbout,
    };

    setSubmitting(true);

    try {
      if (editingId) {
        await updateCustomProduct(editingId, payload, editingImage);
        toast({ title: "Producto actualizado", description: name });
      } else {
        await addCustomProduct(payload);
        toast({ title: "Producto agregado", description: name });
      }
      reset();
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: error instanceof Error ? error.message : "No se pudo guardar el producto.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, productName: string) => {
    if (!confirm(`¿Eliminar "${productName}"?`)) return;

    setDeletingId(id);

    try {
      await removeCustomProduct(id);
      toast({ title: "Producto eliminado" });
      if (editingId === id) reset();
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: error instanceof Error ? error.message : "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">Necesitás iniciar sesión para continuar.</p>
        </main>
        <LoginModal open={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground">
                Agregá productos a la tienda. Los datos se guardan en Firebase.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void signOut()}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border space-y-5 h-fit"
            >
              <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                {editingId ? <Pencil className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                {editingId ? "Editar Producto" : "Nuevo Producto"}
              </h2>

              <div className="space-y-2">
                <Label htmlFor="image">Imagen *</Label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative aspect-[4/5] max-w-xs mx-auto rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden bg-muted/30 flex items-center justify-center"
                >
                  {image ? (
                    <img src={image} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-muted-foreground p-6">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Click para subir</p>
                      <p className="text-xs">PNG, JPG (máx 3MB)</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Ej: Torta de Chocolate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Descripción del producto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (opcional)</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    maxLength={20}
                    placeholder="Ej: $50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags de búsqueda (opcional)</Label>
                <div className="flex flex-wrap gap-2 p-2 rounded-md border border-input bg-background min-h-[42px] focus-within:ring-2 focus-within:ring-ring">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm rounded-full px-3 py-1"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="hover:text-destructive"
                        aria-label={`Quitar ${t}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => tagInput && addTag(tagInput)}
                    maxLength={50}
                    placeholder={tags.length ? "" : "Ej: chocolate, cumpleaños niña, sin tacc"}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Presioná Enter o coma para agregar. Podés usar frases completas.
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-border p-3 bg-muted/20">
                <Label className="text-sm font-medium">Mostrar en secciones</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useInHero"
                    checked={useInHero}
                    onCheckedChange={(v) => setUseInHero(v === true)}
                  />
                  <Label htmlFor="useInHero" className="text-sm font-normal cursor-pointer">
                    Usar en carrousel principal
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useInAbout"
                    checked={useInAbout}
                    onCheckedChange={(v) => setUseInAbout(v === true)}
                  />
                  <Label htmlFor="useInAbout" className="text-sm font-normal cursor-pointer">
                    Usar en "Sobre mí"
                  </Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" variant="hero" className="flex-1" disabled={submitting}>
                  {submitting
                    ? "Guardando..."
                    : editingId
                      ? "Guardar cambios"
                      : "Agregar Producto"}
                </Button>
                <Button type="button" variant="outline" onClick={reset} disabled={submitting}>
                  {editingId ? "Cancelar" : "Limpiar"}
                </Button>
              </div>
            </form>

            {/* List */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Productos creados ({custom.length})
              </h2>

              {custom.length > 0 && (
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre, categoría o tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {productsError && (
                <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  No se pudieron cargar los productos: {productsError}
                </div>
              )}

              {productsLoading ? (
                <div className="bg-card rounded-2xl p-8 text-center border border-dashed border-border">
                  <p className="text-muted-foreground">Cargando productos...</p>
                </div>
              ) : custom.length === 0 ? (
                <div className="bg-card rounded-2xl p-8 text-center border border-dashed border-border">
                  <p className="text-muted-foreground">
                    Aún no agregaste productos. Completá el formulario.
                  </p>
                </div>
              ) : filteredCustom.length === 0 ? (
                <div className="bg-card rounded-2xl p-8 text-center border border-dashed border-border">
                  <p className="text-muted-foreground">No se encontraron productos.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {paginatedCustom.map((p) => (
                      <div
                        key={p.id}
                        className="bg-card rounded-xl p-3 shadow-soft border border-border flex gap-3 items-center"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.category} {p.price && `· ${p.price}`}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                          {p.tags && p.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {p.tags.map((t) => (
                                <span key={t} className="text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEdit(p)}
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            aria-label={`Editar ${p.name}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={deletingId === p.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label={`Eliminar ${p.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-6">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                goToPage(currentPage - 1);
                              }}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {getVisiblePages().map((page, idx) =>
                            page === "ellipsis" ? (
                              <PaginationItem key={`e-${idx}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={currentPage === page}
                                  onClick={(e: React.MouseEvent) => {
                                    e.preventDefault();
                                    goToPage(page);
                                  }}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ),
                          )}
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                goToPage(currentPage + 1);
                              }}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredCustom.length)} de {filteredCustom.length}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
